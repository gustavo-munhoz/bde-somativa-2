use('mongodb-marketplace');

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
  ]);
}

function getTotalSalesByCategory() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "product_oid",
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
  ]);
}