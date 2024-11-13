use('mongodb-marketplace');

function revenueByProduct() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "product_oid",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: "$product.name",
        totalSales: { $sum: "$quantity" },
        totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } }
      }
    },
    {
      $project: {
        _id: 1,
        totalSales: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] }
      }
    },
    { $sort: { totalRevenue: -1 } }
  ]);
}

function revenueByLocation() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "product_oid",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: "$product.sellerLocation",
        totalSales: { $sum: "$quantity" },
        totalRevenue: { $sum: { $multiply: ["$quantity", "$product.price"] } }
      }
    },
    {
      $project: {
        _id: 1,
        totalSales: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] }
      }
    },
    { $sort: { totalRevenue: -1 } }
  ]);
}

function sortedSoldByRegion() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "Product",
        localField: "product_oid",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: {
          region: "$product.sellerLocation",
          product: "$product.name"
        },
        totalSales: { $sum: "$quantity" }
      }
    },
    { $sort: { "_id.region": 1, totalSales: -1 } }
  ]);  
}

function usersSortedByLoyaltyPoints() {
  return db.User.aggregate([
    { $sort: { loyaltyPoints: -1 } },
    { $limit: 10 },
    {
      $project: {
        name: 1,
        email: 1,
        loyaltyPoints: 1
      }
    }
  ]);  
}

function salesWithReviews() {
  return db.Product.aggregate([
    {
      $lookup: {
        from: "Transaction",
        localField: "_id",
        foreignField: "product_oid",
        as: "sales"
      }
    },
    { $unwind: { path: "$sales", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$name",
        totalSales: { $sum: { $ifNull: ["$sales.quantity", 0] } },
        averageRating: { $avg: { $ifNull: ["$reviews.rating", 0] } },
        totalReviews: { $sum: { $cond: [{ $ifNull: ["$reviews.rating", false] }, 1, 0] } }
      }
    },
    { $sort: { totalSales: -1, averageRating: -1 } }
  ]);  
}