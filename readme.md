# JS fundamental

## hoisting

변수 선언이 소스코드가 실행되는 시점(run time) 그 이전에 실행된다.

아래 코드는 ReferenceError 가 발생하지 않고 `undefined` 가 출력된다.

```js
console.log(score); // undefined

var score;
```

## scope

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

### JS 에서의 lexical scope

어디서 정의했는지에 따라 상위 스코프가 결정된다.  
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
