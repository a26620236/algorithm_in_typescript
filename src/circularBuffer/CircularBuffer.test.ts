import CircularBuffer from './CircularBuffer';

describe('basic test', () => {
  const buffer = new CircularBuffer<number>(3);
  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.enqueue(3);

  test('size of buffer', () => {
    expect(buffer.size()).toBe(3);
  });

  test('isEmpty of buffer', () => {
    expect(buffer.isEmpty()).toBe(false);
  });

  test('clear buffer', () => {
    buffer.clear();
    expect(buffer.size()).toBe(0);
  });
});

describe('insertion', () => {
  const buffer = new CircularBuffer<number>(3);

  beforeEach(() => {
    buffer.clear();
  });

  test('write', () => {
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    expect(buffer.peekFront()).toBe(1);
    expect(buffer.contains(2)).toBe(true);
    expect(buffer.contains(3)).toBe(true);
  });

  test('read', () => {
    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    expect(buffer.dequeue()).toBe(1);
    expect(buffer.dequeue()).toBe(2);
    expect(buffer.dequeue()).toBe(3);
  });
});

describe('searching', () => {
  const buffer = new CircularBuffer<number>(3);
  buffer.enqueue(1);
  buffer.enqueue(2);
  buffer.enqueue(3);

  test('contains', () => {
    expect(buffer.contains(1)).toBe(true);
    expect(buffer.contains(2)).toBe(true);
    expect(buffer.contains(3)).toBe(true);
  });
});
