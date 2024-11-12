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