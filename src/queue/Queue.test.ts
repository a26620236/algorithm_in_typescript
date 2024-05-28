import Queue from './Queue';

describe('basic test', () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  test('shape of queue', () => {
    expect([...queue]).toStrictEqual([3, 2, 1]);
  });

  test('size of queue', () => {
    expect(queue.size()).toBe(3);
  });

  test('isEmpty of queue', () => {
    expect(queue.isEmpty()).toBe(false);
  });

  test('clear queue', () => {
    queue.clear();
    expect(queue.size()).toBe(0);
  });
});

describe('insertion', () => {
  const queue = new Queue<number>();

  beforeEach(() => {
    queue.clear();
  });

  test('enqueue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect([...queue]).toStrictEqual([1, 2, 3]);
  });

  test('dequeue', () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });
});

describe('accessing', () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  test('peekFront', () => {
    expect(queue.peekFront()).toBe(3);
  });

  test('peekBack', () => {
    expect(queue.peekBack()).toBe(1);
  });
});

describe('searching', () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  test('contain', () => {
    expect(queue.contain(1)).toBe(true);
    expect(queue.contain(4)).toBe(false);
  });
});
