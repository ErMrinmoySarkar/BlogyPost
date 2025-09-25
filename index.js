const express = require("express");
const { connect } = require("http2");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
//middle wares
app.set(express.urlencoded({extended : true}));
app.set(express.json());

//static set-up
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {   
        id : uuidv4(),
        username : "Shardha Khapra",
        img : "https://pbs.twimg.com/profile_images/1828452192107253760/LgHYdkkd_400x400.jpg",
        content : "Shradha Khapra is an Indian educator, entrepreneur, and content creator, best known as the co-founder of the popular EdTech platform Apna College. Known by many as 'Microsoft Wali Didi,' she initially gained recognition after leaving a high-paying job at Microsoft to pursue her passion for teaching coding",
        likes : 700000
    },

    {
        id : uuidv4(),
        username : "Aman Dhattarwal",
        img : "https://yt3.googleusercontent.com/Pu4tOoOIwq-MSZ1J1-GQuWbEaDppYESaE9uIMTaTXybQD8xFyRmCawPucKeOVuE4iN385CYn5g=s900-c-k-c0x00ffffff-no-rj",
        content :"Aman Dhattarwal is a prominent Indian educator, motivational speaker, and entrepreneur. He is known for his online education ventures and for his mission to educate millions of students.",
        likes : 800000
    },

    {
        id: uuidv4(),
        username : "Elon Musk",
        img : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQHvmQTw2KvOBn_PhOjxFXNvd3mhIvkdXblMzv4stAbnAJe05Z4m2tpqdSaOsMF24l8wxLHmEKQdLCTc3monS9PHmR6_sNFtbISF51zmMQ",
        content : "Elon Musk is an entrepreneur, business magnate, and investor known for founding and leading major technology companies like Tesla, SpaceX, and X (formerly Twitter). He is a polarizing figure, often the subject of both headlines and controversy.",
        likes : 50014 
    },

    {
        id: uuidv4(),
        username : "Bill Gates",
        img : "https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds",
        content : "William Henry 'Bill' Gates III is an American businessman, software developer, and philanthropist who co-founded Microsoft in 1975 with his childhood friend, Paul Allen. He is one of the most famous figures of the microcomputer revolution and has remained influential through his ongoing work in technology and global health.",
        likes : 48784512
    },

    {
        id: uuidv4(),
        username : "Sundar Pichai",
        img : "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS0sQet7d_2RAgQyBQM092dn1Uo-N9Gk3xAdQV7YrSczH-LhdzZYeWIWfVE8B6sIvn1x6SZCpjN5TfBUe8",
        content : "Pichai Sundararajan (born in Madurai, India, on June 10, 1972), widely known as Sundar Pichai, is an Indian-American business executive and the CEO of Alphabet Inc. and its subsidiary, Google.",
        likes : 8099992
    },
    {
        id : uuidv4(),
        username : "Zeff Bezos",
        img : "https://imageio.forbes.com/specials-images/imageserve/67531eb2b5f7c9e191f632d7/0x0.jpg?format=jpg&crop=711,713,x316,y125,safe&height=416&width=416&fit=bounds",
        content : "Jeffrey Preston 'Jeff' Bezos is an American entrepreneur, investor, and media proprietor best known as the founder of Amazon.com. He stepped down as CEO in 2021 to become executive chairman and focus on his other ventures. As of September 2025, he is one of the richest people in the world, with a net worth of around $256 billion.",
        likes : 7894564,
    }

];
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,img,content,likes} = req.body;
    let id = uuidv4();
    posts.push({id,username,img,content,likes});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});
//server starting
app.listen(port,()=>{
    console.log(`listening port : ${port}`);
});