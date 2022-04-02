function multiply(a, b) {
  console.log(arguments);
  return a * b;
}

console.log(multiply()); // NaN, [Arguments] {}
console.log(multiply(1)); // NaN, [Arguments] { '0': 1 }
console.log(multiply(1, 2)); // 2, [Arguments] { '0': 1, '1': 2 }
console.log(multiply(1, 2, 3)); // 2, [Arguments] { '0': 1, '1': 2, '2': 3 }

function sum() {
  const args = Array.from(arguments);
  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));
console.log(sum(1, 2, 3, 4, 5));

function sum2(...args) {
  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum2(1, 2, 3));
