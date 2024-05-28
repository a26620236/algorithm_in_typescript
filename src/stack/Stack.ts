import LinkedList from '../linkedList/LinkedList';

class Stack<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList<T>();
  }

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  clear(): void {
    return this.list.clear();
  }

  // O(1)
  peek(): T {
    return this.list.peekBack();
  }

  // O(1)
  pop(): T {
    return this.list.removeBack();
  }

  // O(1)
  push(val: T): void {
    return this.list.addBack(val);
  }

  contains(val: T): boolean {
    return this.list.contains(val);
  }

  *[Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}

export default Stack;
