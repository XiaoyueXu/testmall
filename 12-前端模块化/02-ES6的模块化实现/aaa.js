let name = '小明';
let age = 18;
let flag = true;

function sum(n1, n2) {
  return n1 + n2;
}

if(flag) {
  console.log(sum(10, 20));
}

/*  
  导出模块中的对象，使得其他模块可以使用
*/ 
// 1. 导出方式一：
export {
  flag,
  sum
}

// 2. 导出方式二：
export let num1 = 1000;
export let height = 1.88;

// 3. 导出函数/类
export function mul(n1, n2) {
  return n1 * n2;
}

export class Person {
  run() {
    console.log('在奔跑');
  }
}

// 4. export default: 有时候导入时不想使用原先的变量名，而想自定义导入后的变量名。
// 同一个模块里，export default 只能有一个
const address = '北京市';
// export default address;
export default function(argument) { //不需要为函数命名
  console.log(argument);
}
