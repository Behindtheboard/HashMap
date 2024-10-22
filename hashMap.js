function linkedList() {
  let head = null;
  let size = 0;
  let current;

  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  const append = function (value) {
    const newNode = new Node(value);
    if (head === null) {
      head = newNode;
    } else {
      current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    size++;
  };

  const prepend = function (value) {
    const newNode = new Node(value);
    if (head === null) {
      head = newNode;
    } else {
      current = head;
      head = newNode;
      head.next = current;
    }
    size++;
  };

  function getSize() {
    return size;
  }

  function getHead() {
    return head;
  }

  function getTail() {
    current = head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  function at(index) {
    if (index > size) {
      return null;
    } else {
      current = head;
      for (i = 1; i < index; i++) {
        current = current.next;
      }
      return current;
    }
  }

  function pop() {
    current = head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
    size--;
  }

  function contains(value) {
    current = head;
    while (current) {
      if (`${current.value}` === `${value}`) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  function find(value) {
    current = head;
    let index = 0;
    while (current) {
      index++;
      if (`${current.value[0]}` === `${value[0]}`) {
        return index;
      }
      current = current.next;
    }
  }

  function toString() {
    current = head;
    let string = ``;
    while (current) {
      string = string.concat(`(${current.value}) -> `);
      current = current.next;
      if (current === null) string = string.concat("null");
    }
    return string;
  }

  function insertAt(value, index) {
    const newNode = new Node(value);
    if (index > size) {
      return null;
    } else {
      current = head;
      if (index <= 1) {
        newNode.next = current.next;
        head = newNode;
        return head;
      }
      for (i = 2; i < index; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
    size++;
  }

  function removeAt(index) {
    if (index > size) {
      return null;
    } else {
      current = head;
      if (index <= 1) {
        head = current.next;
        return head;
      }
      for (i = 2; i < index; i++) {
        current = current.next;
      }
      current.next = current.next.next;
    }
    size--;
  }

  function replace(value, index) {
    const newNode = new Node(value);
    if (index > size || index === undefined) {
      return null;
    } else {
      current = head;
      if (index === 1) {
        newNode.next = current.next;
        head = newNode;
        return;
      }
      for (i = 2; i < index; i++) {
        current = current.next;
      }
      newNode.next = current.next.next;
      current.next = newNode;
    }
  }

  return {
    append,
    prepend,
    getSize,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    replace,
  };
}

function hashMap() {
  const buckets = [];
  let max = 16;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % max;
    }

    return hashCode;
  }

  function set(key, value) {
    const pair = [key, value];
    const index = hash(key);
    if (index < 0 || index >= max) {
      throw new Error("Trying to access index out of bound");
    }
    if (buckets[index] === undefined) {
      const list = linkedList();
      list.append(pair);
      return (buckets[index] = list);
    }
    const i = buckets[index].find(pair);
    if (pair[0] === buckets[index].at(i).value[0]) {
      buckets[index].replace(pair, i);
      return;
    } else {
      buckets[index].append(pair);
      return;
    }
  }

  function get(key) {
    const index = hash(key);
    if (buckets[index] !== undefined) {
      let current = buckets[index].getHead();
      while (current) {
        if (current.value[0] === key) {
          return current.value[1];
        }
        current = current.next;
      }
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    if (buckets[index] !== undefined) {
      let current = buckets[index].getHead();
      while (current) {
        if (current.value[0] === key) {
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  function remove(key) {
    if (has(key)) {
      const index = hash(key);
      const pair = [key, get(key)];
      const i = buckets[index].find(pair);
      console.log(buckets[index].find(pair));
      buckets[index].removeAt(i);
      return true;
    }
    return false;
  }

  function length() {
    let count = 0;
    buckets.forEach((element) => {
      if (element !== undefined) {
        count += element.getSize();
      }
    });
    return count;
  }

  function clear() {
    buckets.length = 0;
  }

  function keys() {
    const array = [];
    buckets.forEach((elements) => {
      let current = elements.getHead();
      while (current) {
        array.push(current.value[0]);
        current = current.next;
      }
    });
    return array;
  }

  function values() {
    const array = [];
    buckets.forEach((elements) => {
      let current = elements.getHead();
      while (current) {
        array.push(current.value[1]);
        current = current.next;
      }
    });
    return array;
  }

  function entries() {
    const array = [];
    buckets.forEach((elements) => {
      let current = elements.getHead();
      while (current) {
        array.push([current.value[0], current.value[1]]);
        current = current.next;
      }
    });
    return array;
  }

  function getHashMap() {
    return buckets;
  }

  return {
    getHashMap,
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
  };
}

const test = hashMap();
test.set("apple", "red");
test.set("apple", "blue");
test.set("elppa", "yellow");
test.set("alwnl", "orange");
test.remove("apple");
console.log(test.hash("alwnl"));
console.log(test.get("elppa"));
console.log(test.has("elppa"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();
console.log(test.getHashMap());
