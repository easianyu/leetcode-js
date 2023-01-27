// since JS does not have a native heap,
// for an interview you can quickly code-up something like this
// letting interviewer know what you are doing
class SimpleHeap {
  constructor(compareFunc) {
    this.compareFunc = compareFunc;
    this.heap = [];
  }

  push(val) {
    this.heap.unshift(val);
    this.heap.sort(this.compareFunc);
  }

  pop() {
    if (this.size === 0) return null;
    return this.heap.shift();
  }

  top() {
    if (this.size === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}
