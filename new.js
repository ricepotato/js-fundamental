function add(x, y) {
  return x + y;
}

// 일반 함수를 new 연산자로 호출함.
let inst = new add();

// 객체를 return 하지 않으면 return 값이 무시된다.
console.log(inst);

function createUser(name, role) {
  return { name, role };
}

inst = new createUser("Lee", "admin");

// 함수가 생성한 객체 반환
console.log(inst);

function Circle(radius) {
  console.log(new.target); // undefined. new 와 함께 호출되었으면 함수 자신.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * radius;
  };
}

// 생성자 없이 일반함수 호출;
const circle = Circle(5);

console.log(circle); // return 값이 없으므로 undefined;

// 일반 함수내의 this 는 전역 window 또는 global 객체
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter(); // error. circle 이 undefined 이므로.
