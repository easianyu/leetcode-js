/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  const set = new Set(words);

  function canConcatenate(word, idx, cnt) {
    if (idx === word.length) {
      return cnt > 1;
    }

    for (let i = idx; i < word.length; i++) {
      const sub = word.substring(idx, i + 1);
      if (!set.has(sub)) continue;
      if (canConcatenate(word, i + 1, cnt + 1)) {
        return true;
      }
    }

    return false;
  }

  const res = [];
  for (const word of words) {
    if (canConcatenate(word, 0, 0)) {
      res.push(word);
    }
  }

  return res;
};

words = [
  'cat',
  'cats',
  'catsdogcats',
  'dog',
  'dogcatsdog',
  'hippopotamuses',
  'rat',
  'ratcatdogcat',
];
findAllConcatenatedWordsInADict(words);

words = ['cat', 'dog', 'catdog'];

findAllConcatenatedWordsInADict(words);
