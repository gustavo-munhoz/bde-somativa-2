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
    user_id: user._id,
    product_id: product._id,
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