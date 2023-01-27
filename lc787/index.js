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

  size() {
    return this.array.length;
  }

  isEmpty() {
    return this.array.length === 0;
  }

  top() {
    return this.array[0];
  }

  push(value) {
    this.array.push(value);
    this.bubbleUp();
  }

  pop(index = 0) {
    if (!this.size()) return null;
    this.swap(index, this.size() - 1); // swap with last
    const value = this.array.pop(); // remove element
    this.bubbleDown(index);
    return value;
  }

  bubbleUp() {
    let index = this.size() - 1;
    const parent = (i) => Math.ceil(i / 2) - 1;
    while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
      this.swap(parent(index), index);
      index = parent(index);
    }
  }

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

  swap(i1, i2) {
    [this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]];
  }
}

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */

var findCheapestPrice = function (n, flights, src, dst, k) {
  const graph = Array.from(Array(n), () => []);
  for (const [from, to, cost] of flights) {
    graph[from].push([to, cost]);
  }

  const visited = Array.from(Array(n), () => Array(k + 1).fill(0));
  const minHeap = new Heap((a, b) => a[0] - b[0]); // [cost, city, times];
  minHeap.push([0, src, 0]);

  while (!minHeap.isEmpty()) {
    const [cost, city, times] = minHeap.pop();
    // console.log(cost, city, times);

    if (city === dst) return cost;
    if (times >= k + 1) continue;
    if (visited[city][times]) continue;
    visited[city][times] = 1;

    for (const [next, price] of graph[city]) {
      if (visited[next][times + 1]) continue;
      minHeap.push([cost + price, next, times + 1]);
    }
  }

  return -1;
};

n = 4;
flights = [
  [0, 1, 100],
  [1, 2, 100],
  [2, 0, 100],
  [1, 3, 600],
  [2, 3, 200],
];
src = 0;
dst = 3;
k = 1;
console.log(findCheapestPrice(n, flights, src, dst, k));

// since JS does not have a native heap,
// for an interview you can quickly code-up something like this
// letting interviewer know what you are doing
class SimpleHeap {
  constructor(compareFunc) {
    this.compareFunc = compareFunc;
    this.heap = [];
  }

  push(val) {
    this.heap.unshift(val);
    this.heap.sort(this.compareFunc);
  }

  pop() {
    if (this.size === 0) return null;
    return this.heap.shift();
  }

  top() {
    if (this.size === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

const maxHeap = new SimpleHeap((a, b) => a.age - b.age);

const yyx = {
  name: 'yyx',
  age: 18,
};

const lhy = {
  name: 'lhy',
  age: 23,
};

maxHeap.push(yyx);
maxHeap.push(lhy);
console.log(maxHeap.top());
