import { compare as compareFunc } from '../utils/compare';

/**
 * A min binary heap implements the priority Queue ADT. It has constant access
 * to the min element of the heap
 */
class MinBinaryHeap<T> {
  private heap: T[];
  private compare: typeof compareFunc;

  constructor(elements?: Iterable<T>) {
    this.heap = [];
    this.compare = compareFunc;

    if (elements) {
      this.heap = Array.from(elements);
      this.heapify();
    }
  }

  // O(n)
  private heapify(): void {
    let i = Math.max(0, Math.floor(this.size() / 2) - 1);

    for (; i >= 0; i--) {
      this.sink(i); // O(log(n))
    }
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  /*********************************
    ACCESSING
  *********************************/
  // O(1)
  peek(): T | null {
    if (this.isEmpty()) return null;

    return this.heap[0];
  }

  /*********************************
    INSERTION
  *********************************/
  // O(log(n))
  add(element: T): void {
    this.heap.push(element);
    const indexOfLastElement = this.size() - 1;
    this.swim(indexOfLastElement);
  }

  /*********************************
    SEARCHING
  *********************************/
  // O(n)
  contains(element: T): boolean {
    return this.heap.includes(element);
  }

  /*********************************
    DELETION
  *********************************/
  // O(log(n))
  poll(): T | null {
    if (this.isEmpty()) return null;

    return this.removeAt(0);
  }

  remove(element: T): boolean {
    const elementIndex = this.heap.findIndex((x) => x === element);

    if (elementIndex === -1) return false;

    this.removeAt(elementIndex);

    return true;
  }

  clear(): void {
    this.heap.length = 0;
  }

  /*********************************
    HELPERS
  *********************************/
  /**
   *
   * Sinks element with index k until heap invariant is satisfied
   * O(log(n)) because in the worst case we sink the element down the entire
   * height of the tree
   */
  private sink(k: number): void {
    while (true) {
      // 1. get the smallest child index
      const leftChildIndex = this.getLeftChildIndex(k);
      const rightChildIndex = this.getRightChildIndex(k);

      let smallestChildIndex = leftChildIndex;

      const isRightChildSmallerThanLeft =
        rightChildIndex < this.size() && this.less(rightChildIndex, leftChildIndex);

      if (isRightChildSmallerThanLeft) smallestChildIndex = rightChildIndex;

      // 2. make sure smallest child index is not out of bounds
      const childrenAreOutOfBounds = leftChildIndex >= this.size();
      const elementsIsLessThanChildren = this.less(k, smallestChildIndex);
      if (childrenAreOutOfBounds || elementsIsLessThanChildren) break;

      // 3. if not, then swap the current node with the child
      this.swap(k, smallestChildIndex);
      k = smallestChildIndex;
    }
  }

  /**
   * Swims an element with index k util heap invariant is satisfied
   * O(log(n)) because in the worst case we sink the element down the entire
   * height of the tree
   */
  private swim(k: number): void {
    let parentIndex = this.getParentIndex(k);

    while (k > 0 && this.less(k, parentIndex)) {
      this.swap(k, parentIndex);
      k = parentIndex;

      parentIndex = this.getParentIndex(k);
    }
  }

  /** Removes element at provided index by swapping it with last element, and
   *  heapify the swapped element by sinking/swimming it
   *  O(log(n)) because in worst case we sink/swim element throughout the entire tree
   */
  private removeAt(indexToRemove: number): T {
    // 1. grab the element at the specified index and save it for later so we can return
    const removedValue = this.heap[indexToRemove];

    /**
     * 2. if the element we`re removing is the last element in the heap, return it.
     * otherwise, swap element with the last element in our heap
     */
    const indexOfLastElement = this.size() - 1;

    if (indexToRemove === indexOfLastElement) {
      return this.heap.pop() as T;
    } else {
      this.swap(indexToRemove, indexOfLastElement);
      this.heap.pop();
    }
    // 3. heapify

    // try sinking
    const indexToBeHeapified = indexToRemove;
    const elementToBeHeapified = this.heap[indexToBeHeapified];

    this.sink(indexToBeHeapified);

    // try swimming
    const elementDidNotMove = this.heap[indexToBeHeapified] === elementToBeHeapified;
    if (elementDidNotMove) {
      this.swim(indexToBeHeapified);
    }

    // 4. return the removed element
    return removedValue;
  }

  private getLeftChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  private getRightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private less(a: number, b: number) {
    return this.compare(this.heap[a], this.heap[b]) < 0;
  }

  private swap(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

export default MinBinaryHeap;
