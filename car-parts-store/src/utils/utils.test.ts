import KeyedCollection from "./KeyedCollection";

test('KeyedCollection tests', () => {
  const col = new KeyedCollection<string>();
  expect(col.getLength()).toBe(0);

  // add item 1
  col.add("first item");
  expect(col.getLength()).toBe(1);
  expect(col.getCurrentKey()).toBe(1);

  // add item 2
  col.add("second item");
  expect(col.getLength()).toBe(2);
  expect(col.getCurrentKey()).toBe(2);

  // remove item 2
  col.remove(1);
  expect(col.getLength()).toBe(1);
  expect(col.getCurrentKey()).toBe(2);

  // add item 3
  col.add("third item");
  expect(col.getLength()).toBe(2);
  expect(col.getCurrentKey()).toBe(3);

  // iterate over existing items
  const t: string[] = [];
  col.iter(v => t.push(v));

  expect(t.length).toBe(2);
  expect(t[0]).toBe('first item')
  expect(t[1]).toBe('third item')
})