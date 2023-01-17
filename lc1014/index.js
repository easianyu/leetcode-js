/**
 * @param {number[]} values
 * @return {number}
 *
 * we say we have a weight property for each element;
 * starting from index 0, the weight of each element decreases by 1 once we move forward by 1 step;
 * keep track of the max weight of the previous element
 */
var maxScoreSightseeingPair = function (values) {
  let maxWeight = values[0] - 1;
  let maxScore = -1e7;
  for (let i = 1; i < values.length; i++) {
    maxScore = Math.max(maxScore, maxWeight + values[i]);
    maxWeight = Math.max(maxWeight, values[i]) - 1;
  }

  console.log(maxScore);
  return maxScore;
};

values = [8, 1, 5, 2, 6];
maxScoreSightseeingPair(values);

values = [1, 2];
// maxScoreSightseeingPair(values);
