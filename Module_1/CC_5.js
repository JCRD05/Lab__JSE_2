function deepComp(a, b) {
    if (a === b) return true;

    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    const aKeys = Object.keys(a).filter(key => typeof a[key] !== 'function');
    const bKeys = Object.keys(b).filter(key => typeof b[key] !== 'function');

    if(aKeys.length !== bKeys.length) return false;

    for(let key of aKeys) {
        if (!(key in b)) return false;
        if(!deepComp(a[key], b[key])) return false;
    }

    return true;
}

let a={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let b={x:[1,2,3,4,5], y:0, z: {m:'test', n:false}};
let c={x:[1,2,3,4,5,6], y:0, z: {m:'test', n:false}};
let d={x:[1,2,3,4], y:0, z: {m:'test', n:false}};
let e={x:[1,2,3,4,5], y:0, z: {m:'test', n:true}};
let f={x:[1,2,3,4,5], y:-1, z: {m:'test', n:false}};
console.log(deepComp(a,b)); // -> true
console.log(deepComp(a,c)); // -> false
console.log(deepComp(a,d)); // -> false
console.log(deepComp(a,e)); // -> false
console.log(deepComp(a,f)); // -> false