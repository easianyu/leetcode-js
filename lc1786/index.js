/**
 * Heap data structure a.k.a Priority Queue
 *
 * Used to get min or max values from a collection in constant time.
 *
 * @author Adrian Mejia <adrian@adrianmejia.com>
 */
class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.array = [];
    this.comparator = (i1, i2) => {
      const value = comparator(this.array[i1], this.array[i2]);
      if (Number.isNaN(value)) {
        throw new Error(
          `Comparator should evaluate to a number. Got ${value} when comparing ${this.array[i1]} with ${this.array[i2]}`
        );
      }
      return value;
    };
  }

  /**
   * Insert element
   * @runtime O(log n)
   * @param {any} value
   */
  push(value) {
    this.array.push(value);
    this.bubbleUp();
  }

  /**
   * Retrieves, but does not remove, the head of this heap
   * @runtime O(1)
   */
  top() {
    return this.array[0];
  }

  /**
   * Retrieves and removes the head of this heap, or returns null if this heap is empty.
   * @runtime O(log n)
   */
  pop(index = 0) {
    if (!this.size()) return null;
    this.swap(index, this.size() - 1); // swap with last
    const value = this.array.pop(); // remove element
    this.bubbleDown(index);
    return value;
  }

  /**
   * Returns the number of elements in this collection.
   * @runtime O(1)
   */
  size() {
    return this.array.length;
  }

  /**
   * Returns if this collection is empty.
   * @runtime O(1)
   */
  empty() {
    return this.array.length === 0;
  }

  /**
   * Move new element upwards on the heap, if it's out of order
   * @runtime O(log n)
   */
  bubbleUp() {
    let index = this.size() - 1;
    const parent = (i) => Math.ceil(i / 2) - 1;
    while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
      this.swap(parent(index), index);
      index = parent(index);
    }
  }

  /**
   * After removal, moves element downwards on the heap, if it's out of order
   * @runtime O(log n)
   */
  bubbleDown(index = 0) {
    let curr = index;
    const left = (i) => 2 * i + 1;
    const right = (i) => 2 * i + 2;
    const getTopChild = (i) =>
      right(i) < this.size() && this.comparator(left(i), right(i)) > 0 ? right(i) : left(i);

    while (left(curr) < this.size() && this.comparator(curr, getTopChild(curr)) > 0) {
      const next = getTopChild(curr);
      this.swap(curr, next);
      curr = next;
    }
  }

  /**
   * Swap elements on the heap
   * @runtime O(1)
   * @param {number} i1 index 1
   * @param {number} i2 index 2
   */
  swap(i1, i2) {
    [this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]];
  }
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countRestrictedPaths = function (n, edges) {
  const M = 1e9 + 7;
  const graph = Array.from(Array(n), () => []);
  for (const [from, to, weight] of edges) {
    graph[from - 1].push([to - 1, weight]);
    graph[to - 1].push([from - 1, weight]);
  }

  const minHeap = new Heap((a, b) => a[1] - b[1]); // [node, totalWeight]
  const visited = Array(n).fill(0);
  const dist = Array(n).fill(Number.MAX_SAFE_INTEGER);
  minHeap.push([n - 1, 0]);
  while (!minHeap.empty()) {
    const [curMinNode, totalWeight] = minHeap.pop();
    if (visited[curMinNode]) continue;
    visited[curMinNode] = 1;
    dist[curMinNode] = totalWeight;

    for (const [nextNode, weight] of graph[curMinNode]) {
      if (visited[nextNode]) continue;
      minHeap.push([nextNode, weight + totalWeight]);
    }
  }

  const cache = Array(n).fill(-1);
  function dfs(node) {
    if (node === n - 1) return 1;
    if (cache[node] !== -1) return cache[node];

    let count = 0;
    for (const [nextNode, _] of graph[node]) {
      if (dist[nextNode] >= dist[node]) continue;
      count = (count + dfs(nextNode)) % M;
    }

    cache[node] = count;

    return count;
  }

  let res = dfs(0);
  // console.log(res);

  return res;
};

n = 5;
edges = [
  [1, 2, 3],
  [1, 3, 3],
  [2, 3, 1],
  [1, 4, 2],
  [5, 2, 2],
  [3, 5, 1],
  [5, 4, 10],
];
countRestrictedPaths(n, edges);

n = 7;
edges = [
  [1, 3, 1],
  [4, 1, 2],
  [7, 3, 4],
  [2, 5, 3],
  [5, 6, 1],
  [6, 7, 2],
  [7, 5, 3],
  [2, 6, 4],
];
countRestrictedPaths(n, edges);
