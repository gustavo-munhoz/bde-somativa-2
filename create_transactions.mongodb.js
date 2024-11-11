
use('mongodb-marketplace');

insertTransaction("John Doe", "iPhone 16", 1);
insertTransaction("Jane Smith", "Wireless Mouse", 2);
insertTransaction("Alice Johnson", "Smart TV 4K", 1);
insertTransaction("Bob Brown", "Gaming Headset", 3);
insertTransaction("Charlie Davis", "Men's Jacket", 1);
insertTransaction("Diana Evans", "Running Shoes", 2);
insertTransaction("Ethan Foster", "Desk Organizer", 1);
insertTransaction("Fiona Green", "LED Desk Lamp", 2);
insertTransaction("George Harris", "Coffee Maker", 1);
insertTransaction("Hannah Irving", "Water Bottle", 5);

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
}

function subtractProductQuantity(product_id, quantity) {
    db.Product.updateOne(
        { _id: product_id },
        { $inc: { available_quantity: -quantity } }
    );
}