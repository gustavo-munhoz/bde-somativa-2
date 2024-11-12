use('mongodb-marketplace');

db.Product.updateMany({}, {
    $set: {
        discountPercentage: 0,
        discountStart: null,
        discountEnd: null
    }
});

function setDiscount(productName, discountPercentage, startDate, endDate) {
    const product = db.Product.findOne({ name: productName });
    if (!product) {
        print(`Product ${productName} not found.`);
        return;
    }

    db.Product.updateOne(
        { _id: product._id },
        {
            $set: {
                discountPercentage: discountPercentage,
                discountStart: new Date(startDate),
                discountEnd: new Date(endDate)
            }
        }
    )
}

function getProductPriceWithDiscount(productName) {
    const product = db.Product.findOne({ name: productName });

    if (!product) {
        print(`Product ${productName} not found.`);
        return;
    }

    const currentDate = new Date();
    if (
        product.discountStart && product.discountEnd &&
        currentDate >= product.discountStart && currentDate <= product.discountEnd
    ) {
        const discountedPrice = product.price * (1 - product.discountPercentage / 100);
        return discountedPrice.toFixed(2);
    }

    return product.price;
}