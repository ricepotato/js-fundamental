# JS fundamental

## hoisting

변수 선언이 소스코드가 실행되는 시점(run time) 그 이전에 실행된다.

아래 코드는 ReferenceError 가 발생하지 않고 `undefined` 가 출력된다.

```js
console.log(score); // undefined

var score;
```

## scope

### lexical scope

자바스크립트 엔진은 함수를 어디에서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정한다. 이를 lexical scope 라고 한다.

아래 코드는 1, 1 을 출력한다.

```js
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

### var 변수의 scope

var 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정한다.  
let, const 는 블록 레벨 스코프를 지원한다.

아래 코드는 의도치 않게 전역변수 x 를 변경한다.

```js
var x = 1;

if (true) {
  var x = 10;
}

console.log(x); // 10;
```

아래 코드에서 i 가 변경된다.

```js
var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i); // 5
```

### 전역객체

browser 환경에서는 window, node 환경에서는 global

### 전역변수

**전역변수를 반드시 사용해야할 이유가 없다면 반드시 지역변수를 사용해야한다.**

아래와 같은 문제점으로 인하여 전역 변수 사용은 지양한다.

- 암묵적 결합(implicit coupling)
  - 변수의 유효범위가 커 가독성이 나빠지고 상태가 변경될 위험상이 높아짐
- 긴 생명주기
  - 메모리 리소스를 오랜기간 소비함.
  - 중복 가능성이 높음.
  - 생명주기가 길어 상태변경에 의한 오류 가능성이 높음
- 스코프 체인 종점에 존재함
  - 비록 짧은 시간이지만 식별자를 검색하는데 시간이 오래걸림
- 네임스페이스 오염
  - js 특성상 파일이 분리되어있어도 하나의 전역스코프를 공유하기 때문에 같은이름으로 명명된 변수, 전역함수가 같은 스코프내에 존재할 수 있음

전역변수 사용억제 기법

- 즉시실행 함수 사용

```js
(function () {
  var foo = 10; // 즉시 실행 함수 내에 생성된 지역변수
})();
```

- namespace object 사용

```js
var MYAPP = {};

MYAPP.name = "Lee";

console.log(MYAPP.name);
```

- module pattern
  - 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싼다.
  - 전역변수 억제, 캡슐화 구현 가능

```js
var Counter = (function () {
  var num = 0;

  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
  };
})();

console.log(Counter.num); // undefined 지역변수 노출되지 않음

console.log(Counter.increase()); // 1
console.log(Counter.increase()); // 2
console.log(Counter.decrease()); // 1
console.log(Counter.decrease()); // 0
```

- es6 module
  - ES6 module 은 독자적인 스코프를 제공한다.
  - 모듈 내에 선언된 var 변수도 전역변수가 아니다.
  - script tag 에 type="module" attribute 를 추가한다.
  - 현재 modern browser 대부분 지원

```html
<script type="module" src="lib.mjs"></script>
```

## let, const block level scope

### var 변수사용의 문제점

- 변수 선언이 중복으로 실행되도 오류가 발생하지 않음.
- 함수레벨 scope 만 인정함.
- 변수가 hoisting 됨.

```js
var x = 1;
var y = 1;

var x = 100; // 여기서 오류가 발생하지 않음
var y; // 초기값이 없는 이 문장은 무시됨

console.log(x); //100
console.log(y);
1;
```

### let 변수

ES6 에서 새로 추가됨

- 변수 중복선언을 허용하지 않음
- 블록 레벨 스코프
- hoisting 이 발생하지 않음

```js
console.log(foo); // ReferenceError : foo is not defined
let fool;
```

```js
let foo = 1;

{
  console.log(foo); // 여기서 전역변수 foo 를 읽지못한다.
  let foo = 2; // foo 가 hoisting 되어 위에서 오류가 발생. 이 문장이 없으면 전역변수 foo 를 읽을 수 있어 오류가 발생하지 않는다.
}
```

## JS 에서의 비동기

- JS 엔진은 하나의 실행 컨텍스트를 가지며 single thread 로 동작함.
- 한번에 하나의 함수만 실행할 수 있음.

### event loop 와 task queue

#### task queue

setTimeout 이나 setInterval 과 같은 비동기 함수의 콜백 또는 이벤트 핸들러가 일시적으로 보관되는 영역.

#### event loop

call stack 에 현재 실행중인 컨텍스트가 있는지, task queue 에 대기중인 함수가 있는 지 확인한다.  
call stack 이 비어있고 task queue 에 대기중인 함수가 있으면 순차적으로 call stack 으로 이동시킨다.

V8 을 비롯한 대부분의 JS 엔진은 크게 2가지 영역으로 구분된다.

- call stack
- heap

## 생성자 함수에 의한 객체 생성

함수 앞에 new 를 붙여 객체 생성

- 반환값을 적지 않으면 암묵적으로 새로 생성된 객체가 return 됨
- 생성자 함수에 의해 생성된 객체는 호출가능하다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(3); // 생성자 함수에 의한 객체 생성
```

함수의 정의 방식에 따라 constructor 와 non-constructor 를 구분한다.

```js
function foo() {}
const bar = function () {};
const baz = {
  x: function () {}, // 메서드 아님. 일반 함수.
};

new foo();
new bar();
new baz.x();

const arrow = () => {};

new arrow(); // error.

const obj = {
  x() {}, // 메서드임. 축약표현은 메서드.
};

new obj.x(); // error. 일반 함수만 new 로 생성할 수 있음.
```

new 연산자에 의한 객체 생성

```js
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
```

## this

this 는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수(self-referencing variable)다.

| 함수 호출 방식 | this 가 가리키는 값                      |
| :------------- | :--------------------------------------- |
| 일반함수       | 전역 객체 (browser: window node: global) |
| 메서드         | 메서드를 호출한 객체(마침표 앞의 객체)   |
| 생성자 함수    | 생성자 함수가 생성할 객체                |

```js
function foo() {
  console.log(this);
}

foo(); // 일반함수 호출 this 는 전역 객체 browser: window, node: global

const obj = { foo };

obj.foo(); // 메서드 호출. this 는 obj

const inst = new foo(); // 생성자 함수. this 는 inst
```

### call, apply, bind

```js
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
```

## closure

함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

```js
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x);
  }

  innerFunc();
}

outerFunc();
```

함수는 자신의 내부 슬롯 [[Environment]] 에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.  
함수는 내부 슬롯 [[Environment]] 에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.

```js
const p = 1;

function outerFunc3() {
  const p = 10;
  const inner = function () {
    console.log(p);
  };
  return inner;
}

const innerfunc3 = outerFunc3(); // 이 시점에서 outerFunc3 는 생명주기를 마감함.
innerfunc3(); //10
// 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첨 함수는 이미 생명주기가 종료된 outerFunc3 변수를 참조할 수 있다.
// 이 중첨 함수를 closure 라고한다.
```

### 활용

상태를 안전하게 변경하고 유지하기 위해 사용한다. 상태를 안전하게 은닉(information hiding) 하고 특정 함수에게만 상태 변경을 허용한다.

아래 코드는 오류를 일으킬 가능성을 내포하고 있는 좋지 않은 코드이다.

```js
let num = 0;

const increase = function () {
  return ++num;
};

console.log(increse());
console.log(increse());
console.log(increse());
```

closure 를 사용한 개선된 코드이다.

```js
const increase = (function () {
  let num = 0;

  return function () {
    return ++num;
  };
})();

console.log(increase());
console.log(increase());
console.log(increase());
```

num 변수에 누구든 접근할 수 있고 변경할 수 있다.(암묵적 결합)

## functional programming

- style of writing code.
- declarative. not imperative.
- safer, easier to debug/maintain.
- do everything with functions.
- avoid side effect. use `pure function`.
- use `higher order function`.
  - functions can be inputs/outputs.
  - Abstracting Patterns of Control.
- don't iterate. use `map`, `reduce`, `filter`.
- avoid mutability. use `immutable` data.
