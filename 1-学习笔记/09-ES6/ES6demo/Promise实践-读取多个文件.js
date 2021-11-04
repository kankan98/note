const fs = require('fs');

// fs.readFile('./resources/text1.md',(err,data1) => {
//   fs.readFile('./resources/text2.md',(err,data2) => {
//     fs.readFile('./resources/text3.md',(err,data3) => {
//       let res = data1 + '\n' + data2 + '\n' + data3
//       console.log(res);
//     })
//   })
// })

const p = new Promise((resolve, reject) => {
  fs.readFile('./resources/text1.md',(err,data) => {
    resolve(data);
  })
})

p.then(res1 => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/text2.md',(err, res2) => {
      resolve([res1, res2])
    })
  })
}).then(res2 => {
  return new Promise((resolve, reject) => {
    fs.readFile('./resources/text3.md',(err, res3) => {
      resolve([...res2 , res3]) //  [text1,text2,text3]
    }) 
  }) 
}).then(res => {
  console.log(res.join('\n'));
})