const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { index } = require("cheerio/lib/api/traversing");
const PORT = 8000

const app = express();
const articles=[];
const arr=[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6];
var count=1;
app.get("/home",(req,res)=>{
    res.json("welcome to TN  Market price api!!");
})

app.get("/",(req,res)=>{
    axios.get("https://rates.goldenchennai.com/vegetable-price/coimbatore-vegetable-price-today/").then((response)=>{
       const html = response.data;
       const $ = cheerio.load(html);
       arr.map(()=>{
        
        var op = $('table').find(`tbody tr:nth-child(${count})`).text()
        count= count +1;
        articles.push(op);
        if(op == ""){
            return
        }
    })
    //loop through each product and split by "\n"
    var mainArr=[];
    var subArr = [];
    articles.map((article)=>{
    subArr=article.split("\n");
    subArr.shift(); // to remove first element of the array
    subArr.pop();   // to remove the last element of the array
    mainArr.push(subArr)
    })
        res.json(mainArr) // return json to route
        //console.log(arr)
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)})