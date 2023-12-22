// http-static.js

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`)));

    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        if (fs.existsSync(filePath)) {
            const { ext } = path.parse(filePath);
            res.writeHead(200, { 'Content-Type': mime.getType(ext) });
            const fileStream = fs.createReadStream(filePath); // 以流的方式读取文件内容
            fileStream.pipe(res); // pipe 方法可以将两个流连接起来，这样数据就会从上游流向下游
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Not Found</h1>');
    }
});


server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080, () => {
    console.log('opened server on', server.address());
});
