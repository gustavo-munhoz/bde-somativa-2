use('mongodb-marketplace');

const result = db.User.insertMany([
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    address: "123 Main St"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "securepassword456",
    address: "456 Maple Ave"
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "alicepwd789",
    address: "789 Oak Blvd"
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: "bobsecure321",
    address: "321 Pine Rd"
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    password: "charliepass654",
    address: "654 Cedar St"
  },
  {
    name: "Diana Evans",
    email: "diana.evans@example.com",
    password: "diana12345",
    address: "987 Spruce Ln"
  },
  {
    name: "Ethan Foster",
    email: "ethan.foster@example.com",
    password: "ethanpass678",
    address: "135 Birch Dr"
  },
  {
    name: "Fiona Green",
    email: "fiona.green@example.com",
    password: "fionagreen987",
    address: "246 Willow Ave"
  },
  {
    name: "George Harris",
    email: "george.harris@example.com",
    password: "georgepwd321",
    address: "357 Aspen Ct"
  },
  {
    name: "Hannah Irving",
    email: "hannah.irving@example.com",
    password: "hannahpass654",
    address: "468 Walnut St"
  }
]);

const userIds = result.insertedIds;

db.Product.insertMany([
  {
    name: "iPhone 16",
    description: "Latest Apple smartphone",
    price: 999.99,
    available_quantity: 50,
    categories: {
      main: "Electronics",
      sub: ["Smartphones", "Mobile Devices"]
    },
    reviews: [
      { user_oid: userIds["0"], rating: 5, comment: "Amazing phone!" },
      { user_oid: userIds["1"], rating: 4, comment: "Great, but expensive." },
      { user_oid: userIds["2"], rating: 5, comment: "Fantastic camera quality and smooth performance." },
      { user_oid: userIds["3"], rating: 3, comment: "Battery life could be better." },
      { user_oid: userIds["4"], rating: 4, comment: "Beautiful design, but it's quite heavy." },
      { user_oid: userIds["5"], rating: 5, comment: "Face ID is faster and more accurate than ever." },
      { user_oid: userIds["6"], rating: 4, comment: "Love the new features, but not a huge upgrade from the previous model." },
      { user_oid: userIds["7"], rating: 5, comment: "Absolutely worth the price if you love Apple products." },
      { user_oid: userIds["8"], rating: 3, comment: "It's good, but not great for the price." },
      { user_oid: userIds["9"], rating: 5, comment: "Best smartphone on the market right now!" }
    ]
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI",
    price: 29.99,
    available_quantity: 120,
    categories: {
      main: "Electronics",
      sub: ["Computer Accessories"]
    },
    reviews: [
      { user_oid: userIds["2"], rating: 4, comment: "Good mouse, comfortable to use." }
    ]
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 10-hour battery life",
    price: 45.99,
    available_quantity: 60,
    categories: {
      main: "Electronics"
    },
    reviews: [
      { user_oid: userIds["4"], rating: 4, comment: "Good sound quality." }
    ]
  },
  {
    name: "Smart TV 4K",
    description: "55-inch 4K Ultra HD Smart TV with HDR",
    price: 499.99,
    available_quantity: 40,
    categories: {
      main: "Electronics",
      sub: ["Home Entertainment"]
    },
    reviews: [
      { user_oid: userIds["7"], rating: 5, comment: "Incredible picture quality!" }
    ]
  },
  {
    name: "Gaming Headset",
    description: "Noise-canceling gaming headset with surround sound",
    price: 79.99,
    available_quantity: 75,
    categories: {
      main: "Electronics",
      sub: ["Gaming Accessories"]
    },
    reviews: [
      { user_oid: userIds["8"], rating: 4, comment: "Comfortable and great sound." }
    ]
  },
  {
    name: "Men's Jacket",
    description: "Stylish winter jacket",
    price: 79.99,
    available_quantity: 30,
    categories: {
      main: "Clothing",
      sub: ["Men's Wear"]
    },
    reviews: []
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with breathable material",
    price: 65.99,
    available_quantity: 90,
    categories: {
      main: "Clothing",
      sub: ["Footwear"]
    },
    reviews: [
      { user_oid: userIds["5"], rating: 5, comment: "Very comfortable and durable." },
      { user_oid: userIds["6"], rating: 4, comment: "Good for daily runs." }
    ]
  },
  {
    name: "Women's Yoga Pants",
    description: "High-waisted yoga pants for comfort and flexibility",
    price: 29.99,
    available_quantity: 110,
    categories: {
      main: "Clothing",
      sub: ["Women's Wear"]
    },
    reviews: [
      { user_oid: userIds["9"], rating: 5, comment: "Great fit and comfortable!" }
    ]
  },
  {
    name: "Baseball Cap",
    description: "Classic baseball cap with adjustable strap",
    price: 14.99,
    available_quantity: 200,
    categories: {
      main: "Clothing",
      sub: ["Accessories"]
    },
    reviews: []
  },
  {
    name: "Hiking Boots",
    description: "Durable and waterproof hiking boots",
    price: 89.99,
    available_quantity: 50,
    categories: {
      main: "Clothing",
      sub: ["Footwear"]
    },
    reviews: [
      { user_oid: userIds["0"], rating: 5, comment: "Perfect for mountain trails." }
    ]
  },
  {
    name: "Basic Notebook",
    description: "A simple notebook for everyday use",
    price: 2.99,
    available_quantity: 500,
    categories: {
      main: "Office Supplies"
    },
    reviews: [
      { user_oid: userIds["0"], rating: 3, comment: "It's okay for basic use." }
    ]
  },
  {
    name: "Desk Organizer",
    description: "Multi-functional desk organizer with pen holder",
    price: 12.50,
    available_quantity: 150,
    categories: {
      main: "Office Supplies"
    },
    reviews: [
      { user_oid: userIds["1"], rating: 4, comment: "Keeps my desk tidy." }
    ]
  },
  {
    name: "Office Chair",
    description: "Ergonomic office chair with lumbar support",
    price: 149.99,
    available_quantity: 35,
    categories: {
      main: "Office Supplies",
      sub: ["Furniture"]
    },
    reviews: [
      { user_oid: userIds["2"], rating: 5, comment: "Very comfortable for long hours." }
    ]
  },
  {
    name: "Whiteboard",
    description: "Dry-erase whiteboard with aluminum frame",
    price: 25.99,
    available_quantity: 100,
    categories: {
      main: "Office Supplies"
    },
    reviews: []
  },
  {
    name: "Fountain Pen",
    description: "Luxury fountain pen with smooth ink flow",
    price: 39.99,
    available_quantity: 80,
    categories: {
      main: "Office Supplies"
    },
    reviews: [
      { user_oid: userIds["3"], rating: 4, comment: "Elegant and writes smoothly." }
    ]
  },
  {
    name: "LED Desk Lamp",
    description: "Energy-efficient desk lamp with adjustable brightness",
    price: 25.50,
    available_quantity: 150,
    categories: {
      main: "HomeAppliances",
      sub: ["Lighting"]
    },
    reviews: []
  },
  {
    name: "Coffee Maker",
    description: "12-cup programmable coffee maker",
    price: 49.99,
    available_quantity: 80,
    categories: {
      main: "HomeAppliances",
      sub: ["Kitchen Appliances"]
    },
    reviews: []
  },
  {
    name: "Air Purifier",
    description: "HEPA air purifier for clean and fresh air",
    price: 129.99,
    available_quantity: 60,
    categories: {
      main: "HomeAppliances",
      sub: ["Air Quality"]
    },
    reviews: [
      { user_oid: userIds["4"], rating: 5, comment: "Made a big difference in air quality." }
    ]
  },
  {
    name: "Microwave Oven",
    description: "700W microwave oven with digital controls",
    price: 89.99,
    available_quantity: 45,
    categories: {
      main: "HomeAppliances",
      sub: ["Kitchen Appliances"]
    },
    reviews: []
  },
  {
    name: "Vacuum Cleaner",
    description: "Powerful vacuum cleaner with multiple attachments",
    price: 99.99,
    available_quantity: 70,
    categories: {
      main: "HomeAppliances",
      sub: ["Cleaning"]
    },
    reviews: [
      { user_oid: userIds["5"], rating: 4, comment: "Works well on all surfaces." }
    ]
  },
  {
    name: "Water Bottle",
    description: "Stainless steel water bottle, 1 liter",
    price: 15.99,
    available_quantity: 200,
    categories: {
      main: "Sports"
    },
    reviews: [
      { user_oid: userIds["1"], rating: 5, comment: "Keeps water cold all day!" }
    ]
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 20.99,
    available_quantity: 200,
    categories: {
      main: "Sports",
      sub: ["Fitness Equipment"]
    },
    reviews: [
      { user_oid: userIds["3"], rating: 5, comment: "Great quality and comfortable." }
    ]
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set for strength training",
    price: 99.99,
    available_quantity: 50,
    categories: {
      main: "Sports",
      sub: ["Fitness Equipment"]
    },
    reviews: [
      { user_oid: userIds["6"], rating: 4, comment: "Great for home workouts." }
    ]
  },
  {
    name: "Basketball",
    description: "Official size and weight basketball",
    price: 24.99,
    available_quantity: 300,
    categories: {
      main: "Sports"
    },
    reviews: [
      { user_oid: userIds["7"], rating: 5, comment: "Good quality and durable." }
    ]
  },
  {
    name: "Tennis Racket",
    description: "Lightweight tennis racket with comfortable grip",
    price: 59.99,
    available_quantity: 90,
    categories: {
      main: "Sports",
      sub: ["Racket Sports"]
    },
    reviews: [
      { user_oid: userIds["8"], rating: 4, comment: "Nice balance and control." }
    ]
  }
]);
