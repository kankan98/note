// 1. 引入 fs 模块

const fs = require('fs');

function readText1() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text1.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
function readText2() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text2.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}
function readText3() {
  return new Promise((resolve,reject) => {
    fs.readFile('./resources/text3.md', (err,data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}

async function main() {
  let data1 = await readText1();
  let data2 = await readText2();
  let data3 = await readText3();
  console.log(data1.toString(),data2.toString(),data3.toString());
}

main();