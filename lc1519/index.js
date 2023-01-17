/**
 * @param {string} s
 * @return {number}
 * two cases: we say that to make sure a string of length n, the prior n-1 can be following 2 cases
 * the min number of flips to make s mono-increasing is dp[n]
 *  1. 00000_: dp[n][0] = dp[n-1][0] + (s[n] === '1' ? 1 : 0)
 *  2. 00011_: dp[n][1] = min(dp[n-1][0], dp[n-1][1]) + (s[n] === '1' ? 1 : 0)
 */
var minFlipsMonoIncr = function (s) {
  const n = s.length;
  let minFlipsEndingIn0 = s[0] === '1' ? 1 : 0;
  let minFlipsEndingIn1 = s[0] === '1' ? 0 : 1;

  for (let i = 1; i < n; i++) {
    const prev0 = minFlipsEndingIn0,
      prev1 = minFlipsEndingIn1;
    minFlipsEndingIn0 = prev0 + (s[i] === '1' ? 1 : 0);
    minFlipsEndingIn1 = Math.min(prev0, prev1) + (s[i] === '1' ? 0 : 1);
  }

  return Math.min(minFlipsEndingIn0, minFlipsEndingIn1);
};

s = '100000001010000';
minFlipsMonoIncr(s);
