/*
  commonJS 导入语法：
  导入aaa.js中定义的 moduleA 的内容
*/
// 写法一：
// var {flag, sum} = require('./aaa.js');

// 写法二：
// var moduleA = require('./aaa.js');
// var flag = aaa.flag;
// var sum = aaa.sum;

// sum(20, 30);