// 1. 使用 commonJS 的模块化
const {add, mul} = require('./mathUtils.js')

console.log(add(20, 30));
console.log(mul(20, 30));

// 2. 使用 ES6 的模块化的规范
import {age, name} from './info';

console.log(age);
console.log(name);