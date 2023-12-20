
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const url = import.meta.url; // 获取当前脚本文件的url
const __dirname = dirname(fileURLToPath(url))
const path = resolve(__dirname, '../corpus/data.json');
const file = readFileSync(path, { encoding: 'utf-8' })

function saveToFile() {
    const outputDir = resolve(__dirname, '../output')
    const outputFile = resolve(outputDir, String(Date.now()))
    console.log('🚀  outputDir:::', outputDir)
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir)
    }
    writeFileSync(outputFile, file)
}

saveToFile()