/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 * https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/
 *
 */
var shipWithinDays = function (weights, days) {
  // const sum = weights.reduce((s, x) => s + x, 0);
  // console.log(sum / days);
  const n = weights.length;
  let left = 1e7,
    right = 0;

  for (let x of weights) {
    left = Math.min(left, x);
    right += x;
  }

  function canShip(capacity) {
    let usedDays = 0,
      i = 0,
      j = 0;

    while (i < n) {
      let curWeight = 0;
      while (j < n && curWeight + weights[j] <= capacity) {
        curWeight += weights[j++];
      }
      usedDays++;
      if (usedDays > days) return false;

      i = j;
    }
    return true;
  }

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (canShip(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  // console.log(left, right);

  return left;
};

weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
days = 5;
// Output: 15
// shipWithinDays(weights, days);

weights = [3, 2, 2, 4, 1, 4];
days = 3;
// Output: 6
// shipWithinDays(weights, days);

weights = [1, 2, 3, 1, 1];
days = 4;
// Output: 6
// shipWithinDays(weights, days);

// console.log(2 + Math.floor((5 - 2) / 2));
// console.log(5 - Math.floor((5 - 2) / 2));

const arr = [
  'HTML',
  'CSS',
  'JavaScript ES6',
  'TypeScript',
  'C++',
  'Java',
  'C#',
  'Python',
  'React',
  'React-Redux',
  'Redux-Saga',
  'Next JS',
  'Axios',
  'Sass',
  'React Native',
  'GraphQL',
  'MySQL',
  'GitHub',
  'Linux',
  'Shell',
];

console.log(arr.toString());
