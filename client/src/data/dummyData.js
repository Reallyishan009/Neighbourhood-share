// Comprehensive dummy data for the application
export const dummyItems = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description: "18V cordless drill with battery and charger. Perfect for home improvement projects. Lightly used, works perfectly.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-10",
    rating: 4.8,
    borrowCount: 3,
    tags: ["power-tools", "diy", "home-improvement"]
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description: "4-person waterproof tent with easy setup. Includes stakes, rainfly, and carrying bag. Perfect for family camping trips.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-08",
    rating: 4.9,
    borrowCount: 5,
    tags: ["camping", "outdoor", "family"]
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description: "Large 6-quart slow cooker with programmable timer. Perfect for meal prep and family dinners. Works great!",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    borrowedBy: "Current User",
    createdAt: "2024-01-05",
    rating: 4.7,
    borrowCount: 8,
    tags: ["cooking", "kitchen", "meal-prep"]
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description: "Non-slip yoga mat, 6mm thick, blue color. Eco-friendly material, perfect for home workouts and meditation.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-12",
    rating: 4.6,
    borrowCount: 2,
    tags: ["yoga", "fitness", "meditation"]
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy and lightweight. Great for home maintenance, painting, and reaching high places.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-03",
    rating: 4.5,
    borrowCount: 6,
    tags: ["ladder", "maintenance", "painting"]
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description: "Complete set with all pieces included. Great for game nights with friends and family. Ages 10+, 3-4 players.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-15",
    rating: 4.9,
    borrowCount: 1,
    tags: ["board-game", "family", "strategy"]
  },
  {
    id: "itm007",
    name: "Power Saw",
    description: "Circular saw with safety guard and extra blades. Perfect for woodworking projects. Requires experience to operate safely.",
    category: "Tools",
    owner: "Mike Chen",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-18",
    rating: 4.8,
    borrowCount: 0,
    tags: ["power-tools", "woodworking", "construction"]
  },
  {
    id: "itm008",
    name: "Stand Mixer",
    description: "KitchenAid stand mixer with multiple attachments. Perfect for baking bread, cakes, and cookies. Heavy-duty motor.",
    category: "Kitchen",
    owner: "Emma Wilson",
    condition: "Very Good",
    available: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-20",
    rating: 4.9,
    borrowCount: 4,
    tags: ["baking", "kitchen", "mixer"]
  },
  {
    id: "itm009",
    name: "Mountain Bike",
    description: "21-speed mountain bike in great condition. Perfect for trails and city riding. Recently serviced with new tires.",
    category: "Outdoors",
    owner: "Jake Thompson",
    condition: "Very Good",
    available: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-22",
    rating: 4.7,
    borrowCount: 2,
    tags: ["bike", "cycling", "outdoor", "exercise"]
  },
  {
    id: "itm010",
    name: "Pressure Washer",
    description: "Electric pressure washer with multiple nozzles. Great for cleaning driveways, decks, and outdoor furniture.",
    category: "Tools",
    owner: "Sarah Martinez",
    condition: "Excellent",
    available: false,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    borrowedBy: "Tom Wilson",
    createdAt: "2024-01-25",
    rating: 4.6,
    borrowCount: 7,
    tags: ["cleaning", "pressure-washer", "outdoor"]
  },
  {
    id: "itm011",
    name: "Air Fryer",
    description: "Large capacity air fryer, barely used. Perfect for healthy cooking and quick meals. Includes recipe book.",
    category: "Kitchen",
    owner: "David Kim",
    condition: "Like New",
    available: true,
    image: "https://images.unsplash.com/photo-1585515656968-29f7ba27c86a?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-28",
    rating: 4.8,
    borrowCount: 1,
    tags: ["cooking", "healthy", "appliance"]
  },
  {
    id: "itm012",
    name: "Guitar (Acoustic)",
    description: "Beautiful acoustic guitar in excellent condition. Perfect for beginners or experienced players. Includes case and picks.",
    category: "Games",
    owner: "Maria Rodriguez",
    condition: "Excellent",
    available: true,
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
    borrowedBy: null,
    createdAt: "2024-01-30",
    rating: 4.9,
    borrowCount: 3,
    tags: ["music", "guitar", "instrument"]
  }
];

export const dummyRequests = [
  {
    id: "req001",
    itemId: "itm003",
    itemName: "Crock Pot",
    owner: "Samantha Green",
    status: "approved",
    requestDate: "2024-01-15",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
  },
  {
    id: "req002", 
    itemId: "itm007",
    itemName: "Power Saw",
    owner: "Mike Chen",
    status: "pending",
    requestDate: "2024-01-18",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop"
  },
  {
    id: "req003",
    itemId: "itm009",
    itemName: "Mountain Bike",
    owner: "Jake Thompson",
    status: "pending",
    requestDate: "2024-01-20",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    id: "req004",
    itemId: "itm011",
    itemName: "Air Fryer",
    owner: "David Kim",
    status: "rejected",
    requestDate: "2024-01-12",
    image: "https://images.unsplash.com/photo-1585515656968-29f7ba27c86a?w=400&h=300&fit=crop"
  }
];

export const dummyMapItems = dummyItems.map((item, index) => ({
  itemId: item.id,
  lat: 28.4595 + (Math.random() - 0.5) * 0.1,
  lng: 77.0266 + (Math.random() - 0.5) * 0.1,
  address: `Block ${String.fromCharCode(65 + index % 5)}, Sector ${45 + index}`,
  name: item.name,
  category: item.category,
  available: item.available
}));

export const dummyUserProfile = {
  userId: "usr123",
  name: "Current User",
  email: "user@example.com",
  trustScore: 9.2,
  lendingCount: 7,
  borrowingCount: 3,
  positiveFeedback: 96,
  joinDate: "2023-08-15",
  location: "Sector 45, Gurgaon",
  badges: ["Trusted Lender", "Community Helper", "Early Adopter"],
  recentActivity: [
    { type: "lent", item: "Cordless Drill", date: "2024-01-20" },
    { type: "borrowed", item: "Camping Tent", date: "2024-01-18" }
  ]
};

export const dummyCategories = [
  { name: "Tools", count: 4, icon: "🔧" },
  { name: "Kitchen", count: 3, icon: "🍳" },
  { name: "Outdoors", count: 2, icon: "🏕️" },
  { name: "Fitness", count: 1, icon: "💪" },
  { name: "Games", count: 2, icon: "🎲" }
];

export const dummyStats = {
  totalItems: dummyItems.length,
  availableItems: dummyItems.filter(i => i.available).length,
  borrowedItems: dummyItems.filter(i => !i.available).length,
  totalBorrows: dummyItems.reduce((sum, item) => sum + item.borrowCount, 0),
  avgRating: 4.7,
  activeUsers: 25,
  communitySavings: 1250
};