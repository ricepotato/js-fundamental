function Circle(radius) {
  this.radius = radius;
  // 아래와 같이 구현하면 모든 객체에 getArea 함수가 중복 생성됨.
  // this.getArea = function () {
  //   return Math.PI * this.radius ** 2;
  // };
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea);
console.log(circle1.getArea());
console.log(circle2.getArea());
