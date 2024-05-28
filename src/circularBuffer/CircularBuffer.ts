class CircularBuffer<T> {
  private list: T[];
  private sz: number;
  private capacity: number;

  private readIndex: number;
  private writeIndex: number;

  constructor(capacity: number) {
    this.list = new Array(capacity);
    this.sz = 0;
    this.capacity = capacity;

    this.readIndex = 0;
    this.writeIndex = 0;
  }

  // O(1)
  size(): number {
    return this.sz;
  }

  // O(1)
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // O(1)
  clear(): void {
    this.list = new Array(this.capacity);
    this.sz = 0;
    this.readIndex = 0;
    this.writeIndex = 0;
  }

  // O(1)
  enqueue(value: T): void {
    this.list[this.writeIndex] = value;

    const isValueOverwritten = this.sz !== 0 && this.readIndex === this.writeIndex;

    if (isValueOverwritten) {
      this.readIndex = (this.readIndex + 1) % this.capacity;
    }

    this.writeIndex = (this.writeIndex + 1) % this.capacity;
    this.sz += 1;
  }

  // O(1)
  dequeue(): T | null {
    if (this.isEmpty()) return null;

    const removeVal = this.list[this.readIndex];

    this.readIndex = (this.readIndex + 1) % this.capacity;
    this.sz -= 1;

    return removeVal;
  }

  peekFront(): T | null {
    if (this.isEmpty()) return null;

    return this.list[this.readIndex];
  }

  peekBack(): T | null {
    if (this.isEmpty()) return null;

    let i = this.writeIndex - 1;

    if (i < 0) {
      i = this.capacity - 1;
    }
    return this.list[i];
  }

  // O(n)
  contains(val: T): boolean {
    return this.list.some((e) => e === val);
  }
}

export default CircularBuffer;
