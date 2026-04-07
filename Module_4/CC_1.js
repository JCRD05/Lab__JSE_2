class MyIterable {
    constructor() {
        this.data = [];
    }

    add(element) {
        if (!this.data.includes(element)) {
            this.data.push(element);
        }
    }

    has(element) {
        return this.data.includes(element);
    }

    del(element) {
        const index = this.data.indexOf(element);
        if (index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }

    get length() {
        return this.data.length;
    }

    *[Symbol.iterator]() {
        for (let item of this.data) {
            yield item;
        }
    }
}

let iterable = new MyIterable();
iterable.add(2);
iterable.add(5);
iterable.add(3);
iterable.add(2); // Duplicate - ignored by the .includes check
iterable.del(3); // Removes 3

console.log(iterable.length); // -> 2
console.log(iterable.has(2));  // -> true
console.log(iterable.has(3));  // -> false
console.log(...iterable);      // -> 2 5