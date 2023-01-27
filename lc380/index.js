var RandomizedSet = function () {
  this.map = {};
  this.list = [];
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (val in this.map) return false;
  this.map[val] = this.list.length;
  this.list.push(val);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!(val in this.map)) return false;
  const idx = this.map[val];
  this.list[idx] = this.list[this.list.length - 1];
  this.list.pop();

  if (idx >= 0) {
    this.map[this.list[idx]] = idx;
  }
  delete this.map[val];
  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const min = 0;
  const max = this.list.length - 1;
  const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(randomInt);
  return this.list[randomInt];
};

const obj = new RandomizedSet();
console.log(obj.insert(0));
console.log(obj);
console.log(obj.insert(0));
console.log(obj);
console.log(obj.remove(0));
console.log(obj);

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

// const obj = {
//   name: 'yyx',
//   age: 18,
// };

// console.log(obj);

// const key = 'name';
// delete obj[key];
// console.log(obj);
