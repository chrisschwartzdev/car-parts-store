
class KeyedCollection<T> {
  private array: { key: number, value: T }[] = [];
  private key = 0;

  add(value: T) {
    this.array.push({ key: this.key, value: value })
    return this.key++;
  }

  remove(key: number) {
    const i = this.array.findIndex(x => x.key === key);
    this.array.splice(i, 1);
  }

  iter(fn: (x: T) => void) {
    this.array.forEach((e) => fn(e.value));
  }

  getLength() {
    return this.array.length;
  }

  getCurrentKey() {
    return this.key;
  }
}

export default KeyedCollection;