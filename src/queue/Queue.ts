import LinkedList from '../linkedList/LinkedList';

class Queue<T> implements Iterable<T> {
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
  peekFront(): T {
    return this.list.peekFront();
  }

  // O(1)
  peekBack(): T {
    return this.list.peekBack();
  }

  // O(1)
  enqueue(val: T): void {
    return this.list.addFront(val);
  }

  // O(1)
  dequeue(): T {
    return this.list.removeBack();
  }

  // O(n)
  contain(val: T): boolean {
    return this.list.contains(val);
  }

  *[Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}

export default Queue;
