// import { readFile, readFileSync } from 'fs'
// import { dirname, resolve } from 'path'
// import { fileURLToPath } from 'url'
// // readFile('./corpus/data.json',{encoding: 'utf-8'},(err,data)=>{
// //   if(!err){
// //     console.log(`output->data`,data)
// //   }else{
// //     console.log(`output->err`,err)
// //   }
// // })

// // 我们使用的相对路径./corpus/data.json是相对于脚本的运行目录（即，node执行脚本的目录），而不是脚本文件的目录。
// // const data = readFileSync('./corpus/data.json',{encoding:'utf-8'})
// // console.log('🚀  data:::', data)

// // 当前脚本文件的 URL 地址， file:///c:/Users/lvqihang/Desktop/mime/bullshit-generator-js/index.js
// const url = import.meta.url
// console.log('🚀  url:::', url)
// // fileURLToPath：先把当前文件地址转换成路径，
// // dirname: 然后获取这个文件的所在的文件夹，
// // resolve: 最后拼接成绝对路径
// const filePath = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
// console.log('🚀  dirname(fileURLToPath(url)):::', dirname(fileURLToPath(url)))
// console.log('🚀  fileURLToPath(url):::', fileURLToPath(url))
// console.log('🚀  filePath:::', filePath)

// const data = readFileSync(filePath,{encoding:'utf8'})
// console.log('🚀  data:::', data)
// console.log('🚀  data:::', JSON.parse(data))

import { options } from './lib/cmd.js';
import { loadCorpus, saveCorpus } from './lib/corpus.js';
import { generate } from './lib/generator.js';
import { createRandomPicker } from './lib/random.js';
import { interact } from './lib/interact.js';

const corpus = loadCorpus('corpus/data.json');
let title = options.title || createRandomPicker(corpus.title)();

(async function () {
    if (Object.keys(options).length <= 0) {
        const answers = await interact([
            { text: '请输入文章主题', value: title },
            { text: '请输入最小字数', value: 6000 },
            { text: '请输入最大字数', value: 10000 },
        ]);
        title = answers[0];
        options.min = answers[1];
        options.max = answers[2];
    }

    const article = generate(title, { corpus, ...options });
    const output = saveCorpus(title, article);

    console.log(`生成成功！文章保存于：${output}`);
}());