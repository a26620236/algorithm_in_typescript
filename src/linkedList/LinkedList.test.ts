import LinkedList from './LinkedList';

describe('basic test', () => {
  const numberList = new LinkedList<number>();
  numberList.addFront(1);
  numberList.addFront(2);
  numberList.addFront(3);

  test('shape of linkedList', () => {
    expect([...numberList]).toStrictEqual([3, 2, 1]);
  });

  test('size of linkedList', () => {
    expect(numberList.size()).toBe(3);
  });

  test('isEmpty of linkedList', () => {
    expect(numberList.isEmpty()).toBe(false);
  });

  test('clear linkedList', () => {
    numberList.clear();
    expect(numberList.size()).toBe(0);
  });
});

describe('insertion', () => {
  const numberList = new LinkedList<number>();

  beforeEach(() => {
    numberList.clear();
  });

  test('fromArray', () => {
    numberList.fromArray([1, 2, 3]);
    expect([...numberList]).toStrictEqual([1, 2, 3]);
  });

  test('addFront', () => {
    numberList.addFront(1);
    numberList.addFront(2);
    numberList.addFront(3);
    expect([...numberList]).toStrictEqual([3, 2, 1]);
  });

  test('addBack', () => {
    numberList.addBack(1);
    numberList.addBack(2);
    numberList.addBack(3);
    expect([...numberList]).toStrictEqual([1, 2, 3]);
  });

  test('addAt with index', () => {
    numberList.addBack(1);
    numberList.addBack(2);
    numberList.addAt(1, 3);
    expect([...numberList]).toStrictEqual([1, 3, 2]);
  });
});

describe('accessing', () => {
  const numberList = new LinkedList<number>();

  numberList.addFront(1);
  numberList.addFront(2);
  numberList.addFront(3);

  test('peek front and back', () => {
    expect(numberList.peekFront()).toBe(3);
    expect(numberList.peekBack()).toBe(1);
  });

  test('get value with specified index', () => {
    expect(numberList.get(1)).toBe(2);
  });
});

describe('searching', () => {
  const numberList = new LinkedList<number>();
  numberList.addFront(1);
  numberList.addFront(2);
  numberList.addFront(3);

  test('indexOf', () => {
    expect(numberList.indexOf(2)).toBe(1);
    expect(numberList.indexOf(4)).toBe(-1);
  });

  test('contains', () => {
    expect(numberList.contains(2)).toBe(true);
    expect(numberList.contains(4)).toBe(false);
  });
});

describe('deletion', () => {
  const numberList = new LinkedList<number>();

  beforeEach(() => {
    numberList.clear();
  });

  test('removeFront', () => {
    numberList.addFront(1);
    numberList.addFront(2);
    numberList.addFront(3);

    numberList.removeFront();
    expect([...numberList]).toStrictEqual([2, 1]);
  });

  test('removeBack', () => {
    numberList.addFront(1);
    numberList.addFront(2);
    numberList.addFront(3);

    numberList.removeBack();
    expect([...numberList]).toStrictEqual([3, 2]);
  });

  test('removeAt', () => {
    numberList.addFront(1);
    numberList.addFront(2);
    numberList.addFront(3);

    numberList.removeAt(1);
    expect([...numberList]).toStrictEqual([3, 1]);
  });
});
