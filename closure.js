const x = 1;

// closure 함수
function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x);
  }

  innerFunc();
}

outerFunc();

// 일반 함수
function outerFunc2() {
  const x = 10;
  innerFunc2();
}

function innerFunc2() {
  console.log(x);
}

outerFunc2();

const p = 1;

function outerFunc3() {
  const p = 10;
  const inner = function () {
    console.log(p);
  };
  return inner;
}

const innerfunc3 = outerFunc3(); // 이 시점에서 outerFunc3 는 생명주기를 마감함.
innerfunc3(); //10 // 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첨 함수는 이미 생명주기가 종료된 outerFunc3 변수를 참조할 수 있다. 이 중첨 함수를 closure 라고한다.
