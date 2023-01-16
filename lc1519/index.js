/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @return {number[]}
 */
var countSubTrees = function (n, edges, labels) {
  const graph = Array.from(Array(n), () => []);
  for (const [from, to] of edges) {
    graph[from].push(to);
    graph[to].push(from);
  }

  const visited = new Set();

  const res = Array(n).fill(0);

  const dfs = (node) => {
    visited.add(node);
    const label = labels[node];
    const labelMap = { [label]: 1 };

    for (let child of graph[node]) {
      if (visited.has(child)) continue;
      const subLabelMap = dfs(child);
      for (const [subLabel, count] of Object.entries(subLabelMap)) {
        if (!(subLabel in labelMap)) {
          labelMap[subLabel] = 0;
        }
        labelMap[subLabel] += count;
      }
    }

    res[node] = labelMap[label];
    return labelMap;
  };

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
