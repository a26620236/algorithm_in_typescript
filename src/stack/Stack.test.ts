import Stack from './Stack';

describe('basic test', () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  test('shape of stack', () => {
    expect([...stack]).toStrictEqual([3, 2, 1]);
  });

  test('size of stack', () => {
    expect(stack.size()).toBe(3);
  });

  test('isEmpty of stack', () => {
    expect(stack.isEmpty()).toBe(false);
  });

  test('clear stack', () => {
    stack.clear();
    expect(stack.size()).toBe(0);
  });
});

describe('insertion', () => {
  const stack = new Stack<number>();

  beforeEach(() => {
    stack.clear();
  });

  test('push', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect([...stack]).toStrictEqual([3, 2, 1]);
  });

  test('pop', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
});

describe('accessing', () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  test('peek', () => {
    expect(stack.peek()).toBe(3);
  });
});

describe('searching', () => {
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);

  test('contains', () => {
    expect(stack.contains(1)).toBe(true);
    expect(stack.contains(2)).toBe(true);
    expect(stack.contains(3)).toBe(true);
    expect(stack.contains(4)).toBe(false);
  });
});
