const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
	console.log(`----->>>>`, req.url);
	if (req.url === "/") {
		res.write('<html><body><form action="/messages" method="POST"><input type="text" name="msg"></form></body></html>');
		return res.end();
	}
	if (req.method === "POST") {
		console.log('I am inside post', req.data);
		const body = [];
		req.on('data', (chunk) => {
			console.log("Chunking------>>>", chunk);
			body.push(chunk);
		})
		req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			fs.writeFileSync("textfiles.txt", parsedBody);
		})
		res.statusCode = 302;
		res.setHeader('Location', '/a');
		return res.end();
	}
	res.write('<html><body><h1>Hello World</h1></body></html>');
});
server.listen(3000);