// 小明
;
// 原始的方式： 采用匿名函数的形式进行模块的导出
let moduleA = (function() {
  let obj = {}; //要导出的内容存放处

  let name = '小明';
  let age = 22;

  function sum(num1, num2) {
    return num1 + num2;
  }

  let flag = true;

  if (flag) {
    console.log(sum(1, 2));
  }

  obj = {
    name,
    age,
    sum()
  }
  return obj;
})


/*
  commonJS 的导出模块：
    需要 node 环境以及底层包才能解析以下语句
*/
// module.exports = {
//   flag: flag,
//   sum: sum
// }