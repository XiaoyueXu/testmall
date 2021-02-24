/*
  从其他模块导入
*/
// 1. 导入 {} 中定义的变量
import {flag} from "./aaa.js";
if(flag) {
  console.log('小明是天才，哈哈哈');
}

// 2. 直接导入 export 定义的变量
import {num1, height} from "./aaa.js";

// 3. 导入 export 的 function/class
import {mul, Person} from './aaa.js';
const p = new Person();
p.run();

// 4. 导入 export default (默认导出) 的变量/函数
import addr from "./aaa.js";
console.log(addr);

// 5. 统一全部导入
import * as aaa from './aaa.js';
console.log(aaa.flag);
