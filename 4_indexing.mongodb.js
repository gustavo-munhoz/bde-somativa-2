use('mongodb-marketplace');

// Index in user name is useful
// because searching by user oid is unpractical,
// although user names are not unique.
function createUserNameIndex() {
  db.User.createIndex({ name: 1 });
}

// Index in user email is important because
// it acts like a unique key for users,
// and can be used to speed up user queries.
function createUserEmailIndex() {
  db.User.createIndex({ email: 1 }, { unique: true });
}

// Index in product name is beneficial
// as it allows for faster searches when querying products
// by their name, which is common in product search features.
function createProductNameIndex() {
  db.Product.createIndex({ name: 1 });
}

// Index in the main category of products is essential
// for queries that filter products based on their main category,
// which improves performance when searching by category.
function createProductMainCategoryIndex() {
  db.Product.createIndex({ "categories.main": 1 });
}

// Index in product price is helpful
// for queries that sort or filter products by price,
// especially for displaying products in a price range
// or sorting by cheapest or most expensive.
function createProductPriceIndex() {
  db.Product.createIndex({ price: 1 });
}

// Index in product ID within transactions
// is necessary to optimize queries that need to find
// all transactions associated with a specific product,
// such as in sales or inventory reports.
function createTransactionProductIndex() {
  db.Transaction.createIndex({ "products.product_id": 1 });
}

// Index in transaction date is critical
// for queries that sort or filter transactions by date,
// which is useful for reports or analyses over specific time periods.
function createTransactionDateIndex() {
  db.Transaction.createIndex({ date: 1 });
}