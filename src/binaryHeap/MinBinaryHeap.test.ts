import MinBinaryHeap from './MinBinaryHeap';

describe('basic test', () => {
  const heap = new MinBinaryHeap<number>();
  heap.add(1);
  heap.add(2);
  heap.add(3);

  test('size of heap', () => {
    expect(heap.size()).toBe(3);
  });

  test('isEmpty of heap', () => {
    expect(heap.isEmpty()).toBe(false);
  });

  test('clear heap', () => {
    heap.clear();
    expect(heap.size()).toBe(0);
  });
});

describe('insertion', () => {
  const heap = new MinBinaryHeap<number>();

  beforeEach(() => {
    heap.clear();
  });

  test('add', () => {
    heap.add(1);
    heap.add(2);
    heap.add(3);
    expect(heap.peek()).toBe(1);
  });

  test('poll', () => {
    heap.add(1);
    heap.add(2);
    heap.add(3);
    expect(heap.poll()).toBe(1);
    expect(heap.poll()).toBe(2);
    expect(heap.poll()).toBe(3);
  });
});

describe('searching', () => {
  const heap = new MinBinaryHeap<number>();
  heap.add(1);
  heap.add(2);
  heap.add(3);

  test('contains', () => {
    expect(heap.contains(1)).toBe(true);
    expect(heap.contains(2)).toBe(true);
    expect(heap.contains(3)).toBe(true);
  });
});

describe('deletion', () => {
  const heap = new MinBinaryHeap<number>();
  heap.add(1);
  heap.add(2);
  heap.add(3);

  test('remove', () => {
    heap.remove(2);
    expect(heap.contains(2)).toBe(false);
  });
});
