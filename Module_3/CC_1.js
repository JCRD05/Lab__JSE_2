function getRandomSet(m, n, allowRepeats, shouldSort) {
    let result = [];

    if (!allowRepeats) {
        let set = new Set();
        while (set.size < m) {
            set.add(Math.floor(Math.random() * (n + 1)));
        }
        result = Array.from(set);
    } else {
        for (let i = 0; i < m; i++) {
            result.push(Math.floor(Math.random() * (n + 1)));
        }
    }

    if (shouldSort) {
        result.sort((a, b) => a - b);
    }

    return result;
}

console.log(getRandomSet(10, 20, false, false));
console.log(getRandomSet(10, 20, false, true));
console.log(getRandomSet(10, 20, true, false));
console.log(getRandomSet(10, 20, true, true));