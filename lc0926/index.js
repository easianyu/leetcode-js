/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
var countSubTrees = function (n, edges, labels) {
  const graph = Array.from(Array(n), () => []);
  for (const [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }

  const dfs = (node) => {
    if (visited.has(node)) return;
    visited.add(node);

    const label = labels[node];
    const before = count[getCode(label)]++;
    for (const child of graph[node]) {
      dfs(child);
    }

    res[node] = count[node] - before;
  };

  const visited = new Set();
  const count = Array(26).fill(0);
  const getCode = (cc) => cc.charCodeAt() - 'a'.charCodeAt();
  const res = Array(n);

  dfs(0);

  return res;
};

n = 4;
edges = [
  [0, 2],
  [0, 3],
  [1, 2],
];
labels = 'aeed';

countSubTrees(n, edges, labels);
