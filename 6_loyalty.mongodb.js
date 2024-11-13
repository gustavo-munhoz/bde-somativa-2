use('mongodb-marketplace')

db.User.updateMany({}, {
    $set: { loyaltyPoints: 0 }
});

function insertTransactionWithLoyaltyPoints(userName, productName, quantity) {
  const user = db.User.findOne({ name: userName });
  if (!user) {
    print(`User ${userName} not found.`);
    return;
  }

  const product = db.Product.findOne({ name: productName });
  if (!product) {
    print(`Product ${productName} not found.`);
    return;
  }

  const totalPrice = product.price * quantity;
  const pointsEarned = Math.floor(totalPrice);

  db.Transaction.insertOne({
    user_oid: user._id,
    product_oid: product._id,
    quantity: quantity,
    date: new Date()
  });

  db.Product.updateOne(
    { _id: product._id },
    { $inc: { available_quantity: -quantity } }
  )

  db.User.updateOne(
    { _id: user._id },
    { $inc: { loyaltyPoints: pointsEarned } }
  );
}

function populateTransactionsWithLoyaltyPoints() {
  const transactions = [
    { userName: "John Doe", productName: "iPhone 16", quantity: 1 },
    { userName: "Jane Smith", productName: "Wireless Mouse", quantity: 2 },
    { userName: "Alice Johnson", productName: "Smart TV 4K", quantity: 1 },
    { userName: "Bob Brown", productName: "Running Shoes", quantity: 3 },
    { userName: "Charlie Davis", productName: "Bluetooth Speaker", quantity: 2 },
    { userName: "Diana Evans", productName: "Gaming Headset", quantity: 1 },
    { userName: "Ethan Foster", productName: "Men's Jacket", quantity: 1 },
    { userName: "Fiona Green", productName: "Yoga Mat", quantity: 2 },
    { userName: "George Harris", productName: "Air Purifier", quantity: 1 },
    { userName: "Hannah Irving", productName: "Desk Organizer", quantity: 4 }
  ];

  transactions.forEach(transaction => {
    insertTransactionWithLoyaltyPoints(
      transaction.userName,
      transaction.productName,
      transaction.quantity
    );
  });
}

populateTransactionsWithLoyaltyPoints();
