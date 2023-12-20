
import readline from 'readline'

const questions = [
    {
        text: '文章标题',
        value: '熬夜冠军'
    },
    {
        text: '最多字数',
        value: '1000'
    },
    {
        text: '最少字数',
        value: '20'
    },
]


const question = (rl, { text, value }) => {
    const q = `${text}(${value})\n`
    return new Promise((resolve) => {
        rl.question(q, (answer) => {
            resolve(answer || value)
        })
    })

}

export async function interact(questions) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const answer = await question(rl, q); // 等待问题的输入
        answers.push(answer);
    }
    rl.close()
    return answers
}