function foo() {
  console.log(this);
}

foo(); // 일반함수 호출 this 는 전역 객체 browser: window, node: global

const obj = { foo };

obj.foo(); // 메서드 호출. this 는 obj

const inst = new foo(); // 생성자 함수. this 는 inst

const bar = { name: "bar" };

foo.call(bar); // bar / apply 와는 parameter 입력방식의 차이
foo.apply(bar); // bar
foo.bind(bar)(); // bar

// 유사 arrary arguments 를 array 로 변환
function convertArgsToArray() {
  console.log(arguments);

  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);

  return arr;
}
