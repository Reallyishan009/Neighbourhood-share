const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 500;


app.use(cors());
app.use(bodyParser.json());


const items = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill, lightly used.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://example.com/images/drill.jpg",
    borrowedBy: null
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent, easy setup.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: "https://example.com/images/tent.jpg",
    borrowedBy: null
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker, works great.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: "https://example.com/images/crockpot.jpg",
    borrowedBy: "Prachi Patel"
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: "https://example.com/images/yogamat.jpg",
    borrowedBy: null
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: "https://example.com/images/ladder.jpg",
    borrowedBy: null
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set, all pieces included.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: "https://example.com/images/catan.jpg",
    borrowedBy: null
  }
];




app.get("/",(req,res)=>{
    res.json({message:"Hello from bride side"})
})

app.get("/api/items",(req,res)=>{
    res.json(items)
})

app.get("/api/items/:id", (req, res) => {
    const item = items.find(item => item.id === req.params.id);  // Corrected here
    
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    res.json(item);
});


app.listen(PORT,()=>{
    console.log("Server is running..");
});