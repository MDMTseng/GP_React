
let tmpArr=[1,2,3,4,5,6,7,8,9,10];


Object.defineProperty(Array.prototype, "prepend", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: function(e) {
    this.unshift(e);
    return this;
 }
});

Object.defineProperty(Array.prototype, "append", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: function(e) {
    this.push(e);
    return this;
 }
});
console.log(
    tmpArr
        .filter(n=> (n%2==0))
        .map(n=> n*10)
        .reduce((p,n)=>(p instanceof Array)?p.append(n+p[p.length-1]):[p,n])
);
