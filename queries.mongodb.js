use('mongodb-marketplace');

function findProductByName(name) {
  return db.Product.findOne({ name: name });
}

function findUserByName(name) {
  return db.User.findOne({ name: name });
}

function insertTransaction(userName, productName, quantity) {
  const user = findUserByName(userName);
  if (!user) {
    print(`User ${userName} not found.`);
    return;
  }

  const product = findProductByName(productName);
  if (!product) {
    print(`Product ${productName} not found.`);
    return;
  }

  db.Transaction.insertOne({
    user_id: user._id,
    product_id: product._id,
    quantity: quantity,
    date: new Date()
  });

  subtractProductQuantity(product._id, quantity);

  print(`Transaction created successfully!`);
}

function subtractProductQuantity(product_id, quantity) {
  db.Product.updateOne(
    { _id: product_id },
    { $inc: { available_quantity: -quantity } }
  );

  print(`Product quantity subtracted by ${quantity}.`);
}

function getAverageRatingForAllProducts() {
  return db.Product.aggregate([
    { $unwind: "$reviews" },
    {
      $group: {
        _id: "$name",
        averageRating: { $avg: "$reviews.rating" }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        averageRating: 1
      }
    },
    {
      $sort: { averageRating: -1 }
    }
  ])
}

function getTotalSalesByCategory() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "product_id",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    { $unwind: "$productDetails" },
    {
      $group: {
        _id: "$productDetails.categories.main",
        totalSales: { $sum: "$quantity" }
      }
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        totalSales: 1
      }
    },
    {
      $sort: { totalSales: -1 }
    }
  ])
}