const fs  = require('fs');

// fs.readFile('./ES6.md', (err,data) => {
//   if(err) throw err;
//   console.log(data.toString());
// })

// 使用 Promise 封装
const p = new Promise((resolve,reject) => {
  fs.readFile('./ES6.md', (err,data) => {
    if(err) {
      reject(err);
    } else {
      resolve(data);
    }
  })
})

p.then(res => {
  console.log(res.toString());
},err => {
  console.log('读取失败');
})