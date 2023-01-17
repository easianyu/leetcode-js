/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  const divident = 60;
  const remainderMap = {};
  let pairs = 0;
  for (const t of time) {
    const remainder = t % divident;
    const diff = (divident - remainder) % divident;
    const timeCanBePaired = diff in remainderMap ? remainderMap[diff] : 0;
    pairs += timeCanBePaired;
    if (!(remainder in remainderMap)) {
      remainderMap[remainder] = 0;
    }
    remainderMap[remainder]++;
  }

  return pairs;
};

time = [30, 20, 150, 100, 40];
numPairsDivisibleBy60(time);

console.log('=============================================');

time = [60, 60, 60];
numPairsDivisibleBy60(time);
