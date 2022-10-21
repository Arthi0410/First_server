const http = require("http");

const port = 8000;

const todolist = ["Devtown", "Projects"]

http
    .createServer((req, res) => {
        const { method, url } = req;

        if (url === "/todos") {
            if (method === "GET") {
                res.writeHead(200);
                res.write(todolist.toString());
            }
            else if (method === "POST") {
                let body = "";
                req.on("error", (err) => {
                    console.error(err);
                })
                    .on("data", (chunk) => {
                        body += chunk;
                    })
                    .on("end", () => {
                        body = JSON.parse(body);
                        let newtodo = todolist;
                        newtodo.push(body.name);
                        console.log(newtodo);
                        res.writeHead(201);
                    })
            }
            else if (method === "DELETE") {
                let body = "";
                req.on("error", () => {
                    console.error(err);
                })
                    .on("data", (chunk) => {
                        body += chunk;
                    })
                    .on("end", () => {
                        body = JSON.parse(body);
                        let deletethis = body.item;

                        for (let i = 0; i < todolist.length; i++) {
                            if (todolist[i] == deletethis) {
                                todolist.splice(i, 1);
                                break;
                            }
                        }
                        res.writeHead(204);

                    })
            }

            else {
                res.writeHead(501);
            }
        }
        else {
            res.writeHead(404);
        }

        res.end();
    })
    .listen(port, () => {

        console.log(`Nodejs server started on port ${port}`);
    });

