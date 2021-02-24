// 1. 使用 commonJS 的模块化
const {add, mul} = require('./js/mathUtils')

console.log(add(20, 30));
console.log(mul(20, 30));

// 2. 使用 ES6 的模块化的规范
import {age, name} from './js/info.js';

console.log(age);
console.log(name);

// 3. 依赖css文件
require('./css/normal.css')

// 4. 依赖less文件
require('./css/special.less')
document.writeln('<h2>你好啊，李银河！</h2>')