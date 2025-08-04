const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 500; // Fixed port

app.use(cors());
app.use(bodyParser.json());

// Mock data
const items = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill, lightly used.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null
  }
];

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Neighborhood Sharing API is running!" });
});

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Get single item
app.get("/api/items/:id", (req, res) => {
  const item = items.find(item => item.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// Add new item
app.post("/api/items", (req, res) => {
  const { name, description, category, condition, image } = req.body;
  
  // Basic validation
  if (!name || !description || !category || !condition) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newItem = {
    id: `itm${String(items.length + 1).padStart(3, '0')}`,
    name,
    description,
    category,
    owner: "Current User", // Mock owner
    condition,
    available: true,
    image: image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    borrowedBy: null
  };

  items.push(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// Request to borrow item
app.post("/api/items/:id/request", (req, res) => {
  const itemId = req.params.id;
  const item = items.find(item => item.id === itemId);
  
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  
  if (!item.available) {
    return res.status(400).json({ error: "Item is not available" });
  }

  // Mock borrow request (in real app, this would create a request record)
  res.json({ 
    success: true, 
    status: "requested",
    message: `Request sent to ${item.owner} for ${item.name}` 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  
});
