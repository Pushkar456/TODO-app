import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

var tasks = [];

const app = express();

if (!(fs.existsSync("tasks.txt"))) {
    fs.createWriteStream("tasks.txt");
    console.log("file created sucess");
}


function getTasks() {
    if (!(fs.existsSync("tasks.txt"))) {
        fs.createWriteStream("tasks.txt");
        // console.log("file created sucess");
    }
    var data = fs.readFileSync("tasks.txt", "utf-8");
    if (data) {
        console.log(data)
        tasks = data.split(",");
        // console.log("data sucessfully read: ", tasks);
        return data;
    }
}

function updateFile(data1) {
    let data = getTasks();
    if (data) {
        fs.appendFileSync("tasks.txt", data1 + ",");
    } else {
        fs.writeFile("tasks.txt", data1 + ",", (e) => {
            if (e) throw (e);
        });
        data = "";
    }
    data = data + data1 + ","
    tasks = data.split(",");
}
// getTasks();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    getTasks();
    res.render("index.ejs", { tasks });
});

app.post("/submit", (req, res) => {
    updateFile(req.body.task);
    res.render("index.ejs", { tasks });
});

app.listen(3000, () => {
    console.log("port : 3000");
});


