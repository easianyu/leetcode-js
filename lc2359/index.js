/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
var closestMeetingNode = function (edges, node1, node2) {
  function getDistanceMap(node) {
    const map = new Map();
    let idx = node,
      dis = 0;
    while (idx !== -1) {
      if (map.has(idx)) break;
      map.set(idx, dis++);
      idx = edges[idx];
    }
    // console.log(map);
    return map;
  }

  const map1 = getDistanceMap(node1);
  const map2 = getDistanceMap(node2);

  let minDis = 1e7,
    index = -1;
  for (const [node, dis1] of map1) {
    if (!map2.has(node)) continue;
    let dis2 = map2.get(node);
    // console.log(node, dis1);
    // console.log(dis1, dis2);
    let maxDis = Math.max(dis1, dis2);
    if (maxDis < minDis || (maxDis === minDis && node < index)) {
      minDis = maxDis;
      index = node;
    }
  }
  return index;
};

edges = [2, 2, 3, -1];
node1 = 0;
node2 = 1;
console.log(closestMeetingNode(edges, node1, node2));

edges = [1, 2, -1];
node1 = 0;
node2 = 2;
console.log(closestMeetingNode(edges, node1, node2));

edges = [4, 4, 4, 5, 1, 2, 2];
node1 = 1;
node2 = 1;
console.log(closestMeetingNode(edges, node1, node2));

edges = [5, 3, 1, 0, 2, 4, 5];
node1 = 3;
node2 = 2;
console.log(closestMeetingNode(edges, node1, node2));
//
