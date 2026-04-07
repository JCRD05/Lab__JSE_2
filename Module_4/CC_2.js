let myDecorator = function(fn) {
    let history = [];

    return function(...args) {
        let argsKey = args.join(",");

        if (history.includes(argsKey)) {
            console.log(`arguments already used: ${argsKey}`);
        } else {
            history.push(argsKey);
            return fn(...args); 
        }
    };
};

let sum = function(...args) {
    let retVal = 0;
    for(let arg of args) {
        retVal += arg;
    }
    return retVal;
}
let dfn = myDecorator(sum);
dfn(2, 3, 4);
dfn(4, 5);
dfn(2, 3, 4); // -> arguments already used: 2,3,4
dfn(4, 5); // -> arguments already used: 4,5