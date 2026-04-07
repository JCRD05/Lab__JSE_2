function getPromiseArray(arr) {
    return arr.map(item => {
        return new Promise((resolve, reject) => {
            if (Number.isInteger(item) && item > 0) {
                setTimeout(() => {
                    resolve(item);
                }, item);
            } else {
                reject(new Error(`${item} is not a positive integer`));
            }
        });
    });
}

let promises1 = getPromiseArray([10, 30, 5, 20, 'a']);

Promise.all(promises1)
    .then(a => console.log(`all: ${a}`))
    .catch(e => console.log(`all: ${e.message}`)); // -> all: a is not a positive integer

Promise.any(promises1)
    .then(a => console.log(`any: ${a}`))
    .catch(e => console.log(`any: ${e.message}`)); // -> any: 5