/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  // the # of times being trusted, and the # of times trust others
  const trusted = Array(n).fill(0);
  const trusts = Array(n).fill(0);
  for (const [a, b] of trust) {
    trusted[b - 1]++;
    trusts[a - 1]++;
  }

  for (let i = 0; i < n; i++) {
    if (trusted[i] === n - 1 && trusts[i] === 0) {
      return i + 1;
    }
  }

  return -1;
};

n = 3;
trust = [
  [1, 3],
  [2, 3],
  [3, 1],
];
console.log(findJudge(n, trust));
