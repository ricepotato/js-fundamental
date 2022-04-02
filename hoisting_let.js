let foo = 1;

{
    console.log(foo); // 여기서 전역변수 foo 를 읽지못한다.
    let foo = 2; // foo 가 hoisting 되어 위에서 오류가 발생. 이 문장이 없으면 전역변수 foo 를 읽을 수 있어 오류가 발생하지 않는다.
}