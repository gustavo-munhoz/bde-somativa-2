use('mongodb-marketplace');

// Inserting new fields
db.User.updateMany({}, {
  $set: {
    location: {
      type: 'Point',
      coordinates: [0, 0]
    }
  }
});

db.Product.updateMany({}, {
  $set: {
    sellerLocation: {
      type: 'Point',
      coordinates: [0, 0]
    }
  }
});

// Creating indexes
db.User.createIndex({ location: "2dsphere" });
db.Product.createIndex({ sellerLocation: "2dsphere" });


// Populating the fields
function populateGeolocations() {
  const userLocations = [
    [-46.633308, -23.55052],
    [-43.209373, -22.911013],
    [-51.92528, -14.235004],
    [-38.52544, -12.9714],
    [-49.265381, -25.428954],
    [-34.87888, -8.047562],
    [-60.02578, -3.119028],
    [-48.54822, -27.595377],
    [-35.20945, -5.79448],
    [-51.618641, -19.932221]
  ];

  const productLocations = [
    [-46.634308, -23.55352],
    [-43.210373, -22.913013],
    [-51.92728, -14.237004],
    [-38.52744, -12.9734],
    [-49.267381, -25.430954],
    [-34.88088, -8.049562],
    [-60.02778, -3.121028],
    [-48.55022, -27.597377],
    [-35.21145, -5.79648],
    [-51.620641, -19.934221]
  ];

  let userIndex = 0;
  let productIndex = 0;

  const userLocationCount = userLocations.length;
  const productLocationCount = productLocations.length;

  db.User.find().forEach(user => {
    const coordinates = userLocations[userIndex % userLocationCount];
    db.User.updateOne(
      { _id: user._id },
      { $set: { location: { type: "Point", coordinates: coordinates } } }
    );
    userIndex++;
  });

  db.Product.find().forEach(product => {
    const coordinates = productLocations[productIndex % productLocationCount];
    db.Product.updateOne(
      { _id: product._id },
      { $set: { sellerLocation: { type: "Point", coordinates: coordinates } } }
    );
    productIndex++;
  });
}

populateGeolocations();

// Queries
function findProductsNearby(userCoordinates, maxDistance) {
  return db.Product.find({
    sellerLocation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: userCoordinates
        },
        $maxDistance: maxDistance
      }
    }
  }).toArray();
}

function averageDistanceBetweenBuyersAndSellers() {
  return db.Transaction.aggregate([
    {
      $lookup: {
        from: "User",
        localField: "user_oid",
        foreignField: "_id",
        as: "buyer"
      }
    },
    {
      $lookup: {
        from: "Product",
        localField: "product_oid",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$buyer" },
    { $unwind: "$product" },
    {
      $addFields: {
        distance: {
          $sqrt: {
            $add: [
              { 
                $pow: [{ $subtract: [
                { $arrayElemAt: ["$buyer.location.coordinates", 0] },
                { $arrayElemAt: ["$product.sellerLocation.coordinates", 0] }] }, 2]
              },
              { 
                $pow: [{ $subtract: [
                  { $arrayElemAt: ["$buyer.location.coordinates", 1] },
                  { $arrayElemAt: ["$product.sellerLocation.coordinates", 1] }] }, 2]
              }
            ]
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        averageDistance: { $avg: "$distance" }
      }
    }
  ]);
}

function findMostPopularCategoryInArea(coordinates, maxDistance) {
  return db.Product.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: coordinates },
        distanceField: 'distance',
        maxDistance: maxDistance,
        spherical: true
      }
    },
    { $unwind: "$categories.sub" },
    {
      $group: {
        _id: "$categories.sub",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ]).toArray();
}