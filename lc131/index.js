/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const res = [];
  const n = s.length;

  function isPalin(start, end) {
    while (start <= end) {
      if (s[start++] !== s[end--]) return false;
    }
    return true;
  }

  function dfs(idx, li) {
    if (idx === n) {
      res.push([...li]);
      return;
    }

    for (let i = idx; i < n; i++) {
      if (!isPalin(idx, i)) continue;
      li.push(s.substring(idx, i + 1));
      dfs(i + 1, li);
      li.pop();
    }
  }

  dfs(0, []);

  return res;
};

s = 'aab';
console.log(partition(s));
