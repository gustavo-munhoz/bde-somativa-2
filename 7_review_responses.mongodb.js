use('mongodb-marketplace');

db.Product.updateMany(
  { "reviews.sellerResponse": { $exists: false } },
  { $set: { "reviews.$[].sellerResponse": null } }
);

function respondToReview(productName, userName, response) {
  const product = db.Product.findOne({ name: productName });
  if (!product) {
    print(`Product ${productName} not found.`);
    return;
  }

  db.Product.updateOne(
    { name: productName, "reviews.userName": userName },
    { $set: { "reviews.$.sellerResponse": response } }
  );
}

function populateReviewsWithResponses() {
  const users = db.User.find().toArray();
  const userMap = {};
  users.forEach(user => {
    userMap[user.email] = user._id;
  });

  const reviewsArray = [
    { productName: "iPhone 16", userEmail: "john.doe@example.com", response: "Thank you for your feedback!" },
    { productName: "Wireless Mouse", userEmail: "alice.johnson@example.com", response: "We're glad you liked it!" },
    { productName: "Bluetooth Speaker", userEmail: "charlie.davis@example.com", response: "Thanks for the great review!" },
    { productName: "Smart TV 4K", userEmail: "hannah.irving@example.com", response: "Enjoy your new TV!" },
    { productName: "Gaming Headset", userEmail: "george.harris@example.com", response: "Happy gaming!" },
    { productName: "Running Shoes", userEmail: "diana.evans@example.com", response: "We're glad you found them comfortable!" },
    { productName: "Running Shoes", userEmail: "ethan.foster@example.com", response: "Thank you for your review!" },
    { productName: "Women's Yoga Pants", userEmail: "hannah.irving@example.com", response: "So happy you love them!" },
    { productName: "Basic Notebook", userEmail: "john.doe@example.com", response: "We appreciate your honest feedback." },
    { productName: "Fountain Pen", userEmail: "bob.brown@example.com", response: "Enjoy writing with elegance!" }
  ];

  reviewsArray.forEach(review => {
    const userId = userMap[review.userEmail];
    if (!userId) {
      print(`User with email ${review.userEmail} not found.`);
      return;
    }

    db.Product.updateOne(
      { name: review.productName, "reviews.user_oid": userId },
      { $set: { "reviews.$.sellerResponse": review.response } }
    );
  });
}