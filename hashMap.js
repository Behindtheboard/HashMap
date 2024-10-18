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
      if (`${current.value}` === `${value}`) {
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
      for (i = 2; i < index; i++) {
        current = current.next;
      }
      current.next = current.next.next;
    }
    size--;
  }

  function replace(value, index) {
    const newNode = new Node(value);
    if (index > size) {
      return null;
    } else {
      current = head;
      if(index === 1) {
        head = newNode;
        return head.next = current;
      }
      for (i = 2; i < index; i++) {
        current = current.next;
      }
      newNode.next = current.next;
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
    } else {
      if (bucket[index].contains(pair)) {
        const i = list.find(pair);
        return list.replace(pair, i);
      } else {
        return buckets[index].append(pair);
      }
    }
  }

  function getHashMap() {
    return buckets[10].getHead();
  }

  return { getHashMap, set, hash };
}

const test = hashMap();
test.set('apple', 'red')
console.log(test.hash('apple'))

console.log(test.getHashMap());