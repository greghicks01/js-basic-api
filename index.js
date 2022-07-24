const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const {v4 : uuid } = require("uuid");

// https://www.youtube.com/watch?v=TcvOgwQPsSo

const app = express();

app.use(express.json());

app.get("/outfit", (req, res) => {
    const tops = ["Black","White","Orange","Navy"];
    const jeans = ["Grey","Dark Grey","Black","Navy"];
    const shoes = ["White","Grey","Black"];

    res.json({
        top: _.sample(tops),
        jean: _.sample(jeans),
        shoe: _.sample(shoes)
    }) ;
});

app.get("/birthdays", (req, res) => {
    res.send("27 Jun 1962!") ;
});

app.post("/comments", async (req, res)=>{
    const id = uuid();
    const content = req.body.content;

    console.log(id);
    console.log(content);

    if (!content){
        return res.sendStatus(400);
    }

    // file output
    await fs.mkdir ("data/comments", { recursive: true } );
    await fs.writeFile(`data/comments/${id}.txt`,content)

    res.status(201).json({
        id: id
    });
    //save the comment to disk
});

app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    let content;

    try{
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch(err){
        return res.sendStatus(404);
    }
    

    res.json({
        content: content
    });

});

app.listen(3000, () => console.log("API Server is running..."));