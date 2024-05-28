import { checkIsEqual } from '../utils/checkIsEqual';

class LinkedListNode<T> {
  prev: LinkedListNode<T> | null;
  next: LinkedListNode<T> | null;
  val: T;

  constructor(val: T) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

interface List<T> {
  head: LinkedListNode<T> | undefined;
  tail: LinkedListNode<T> | undefined;
  size: number;
}

class LinkedList<T> implements Iterable<T> {
  private list: List<T> | undefined;

  constructor() {
    this.list = undefined;
  }

  /**
   * return list size - O(1)
   */
  size(): number {
    if (this.list) return this.list.size;

    return 0;
  }

  isEmpty(): boolean {
    return !this.list;
  }

  clear(): void {
    this.list = undefined;
  }

  /*********************************
    INSERTION
  *********************************/
  addFront(val: T): void {
    const newNode = new LinkedListNode(val);

    if (this.list?.head) {
      this.list.head.prev = newNode;
      newNode.next = this.list.head;

      this.list.head = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }

  addBack(val: T) {
    const newNode = new LinkedListNode(val);

    if (this.list?.tail) {
      this.list.tail.next = newNode;
      newNode.prev = this.list.tail;

      this.list.tail = newNode;
      this.list.size += 1;
    } else {
      this.list = {
        head: newNode,
        tail: newNode,
        size: 1,
      };
    }
  }

  /**
   * Adds a node at specified index = O(n)
   */
  addAt(i: number, val: T): void {
    if (!this.list) throw new Error('empty list error');

    if (i < 0 || i >= this.size()) {
      throw new Error('out of bounds error');
    }

    if (i === 0) {
      this.addFront(val);
      return;
    }

    if (i === this.size()) {
      this.addBack(val);
      return;
    }

    let cur = this.list.head as LinkedListNode<T>;
    for (let j = 0; j < i; j++) {
      if (cur.next) {
        cur = cur.next;
      }
    }

    const newNode = new LinkedListNode(val);

    if (cur.prev) {
      cur.prev.next = newNode;
      newNode.prev = cur.prev;
      cur.prev = newNode;
      newNode.next = cur;

      this.list.size += 1;
    }
  }

  /*********************************
    ACCESSING
  *********************************/
  /**
   * gets the value of head - O(1)
   */
  peekFront(): T {
    if (!this.list) throw new Error('list empty error');

    return this.list.head!.val;
  }

  /**
   * gets the value of tail - O(1)
   * @returns {T} value of tail
   */
  peekBack(): T {
    if (!this.list) throw new Error('list empty error');

    return this.list.tail!.val;
  }

  /**
   * Gets the element at index i - O(n)
   */
  get(i: number): T {
    if (!this.list) throw new Error('empty list error');

    if (i < 0 || i >= this.size()) {
      throw new Error('out of bounds error');
    }

    if (i === 0) {
      return this.peekFront();
    }

    if (i === this.size() - 1) {
      return this.peekBack();
    }

    let cur = this.list.head as LinkedListNode<T>;
    for (let j = 0; j < i; j++) {
      if (cur.next) {
        cur = cur.next;
      }
    }
    return cur.val;
  }

  /*********************************
    SEARCHING
  *********************************/
  /**
   *
   * return the first occurrence of the specified item index in linked list - O(n)
   * Equals function must be supplied for non-primitive values.
   */
  indexOf(value: T): number {
    if (!this.list) return -1;

    let i = 0;
    let cur = this.list.head as LinkedListNode<T>;

    while (!checkIsEqual(cur.val, value)) {
      if (i === this.size() - 1) return -1;

      if (cur.next) {
        cur = cur.next;
        i++;
      }
    }

    return i;
  }

  /**
   *
   * Checks if value is in linked list - O(n)
   * Equals function must be supplied for non-primitive values.
   */
  contains(value: T): boolean {
    const index = this.indexOf(value);

    return index !== -1;
  }

  /*********************************
    DELETION
  *********************************/
  /**
   *
   * Removes head - O(1)
   * @return {T} - value of removed head
   */
  removeFront(): T {
    if (!this.list) throw new Error('empty list error');
    const removedValue = this.list.head?.val as T;

    if (this.list.head) {
      if (this.list.head.next) {
        this.list.head.next.prev = null;
        this.list.head = this.list.head.next;
        this.list.size -= 1;
      } else {
        this.list = undefined;
      }
    }

    return removedValue;
  }
  /**
   *
   * Removes tail - O(1)
   * @return {T} - value of removed tail
   */
  removeBack(): T {
    if (!this.list) throw new Error('empty list error');
    const removedValue = this.list.tail?.val as T;

    if (this.list.tail) {
      if (this.list.tail.prev) {
        this.list.tail.prev.next = null;
        this.list.tail = this.list.tail.prev;
        this.list.size -= 1;
      } else {
        this.list = undefined;
      }
    }

    return removedValue;
  }

  /**
   *
   * Remove the specified item by index in linked list - O(n)
   */
  removeAt(i: number): T {
    if (!this.list) throw new Error('empty list error');

    if (i < 0 || i >= this.size()) {
      throw new Error('out of bounds error');
    }

    if (i === 0) return this.removeFront();

    if (i === this.size() - 1) return this.removeBack();

    let j = 0;
    let cur = this.list.head!;

    while (i !== j) {
      if (cur.next) {
        cur = cur.next;
      }
      j++;
    }

    if (cur.prev) {
      cur.prev.next = cur.next;
    }
    if (cur.next) {
      cur.next.prev = cur.prev;
    }

    return cur.val;
  }

  fromArray(A: T[]): LinkedList<T> {
    for (const a of A) {
      this.addBack(a);
    }
    return this;
  }

  *[Symbol.iterator](): Iterator<T> {
    if (!this.list) {
      console.log('empty list');
      return;
    }

    for (let cur = this.list.head as LinkedListNode<T> | null; cur !== null; cur = cur.next) {
      yield cur.val;
    }
  }
}

export default LinkedList;
