const express = require("express");

const app = express();

app.use(express.json());

const port = 8000;
const todolist = ["Devtown", "Projects"]


app.get("/todos", (req, res) => {
    res.status(200).send(todolist);
});

app.post("/todos", (req, res) => {
    let newtodo = req.body.name;
    todolist.push(newtodo);
    res.status(201).send({
        message: "Item added sucessfully"
    });
});

app.delete("/todos", (req, res) => {
    let deleteitem = req.body.item;
    todolist.find((element, index) => {
        if (element === deleteitem) {
            todolist.splice(index, 1);
        }
    });
    res.status(201).send({
        message: `Item deleted - "${req.body.item}"`
    })
});

app.all("/todos", (req, res) => {
    res.status(501).send();
})

app.all("*", (req, res) => {
    res.status(404).send();
})

app.listen(port, () => {
    console.log(`Nodejs server running on port ${port}`);
});

