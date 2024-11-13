
use('mongodb-marketplace');

db.dropDatabase();

db.createCollection("User", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "address"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        address: {
          bsonType: "string",
          description: "must be a string"
        }
      }
    }
  }
});

db.createCollection("Product", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "price", "available_quantity", "categories"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        description: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        price: {
          bsonType: "double",
          description: "must be a double and is required",
          minimum: 0
        },
        available_quantity: {
          bsonType: "int",
          description: "must be an integer and is required",
          minimum: 0
        },
        categories: {
          bsonType: "object",
          required: ["main"],
          properties: {
            main: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            sub: {
              bsonType: "array",
              description: "must be an array",
              items: {
                bsonType: "string",
                description: "must be a string"
              }
            }
          }
        },
        reviews: {
          bsonType: "array",
          description: "must be an array",
          minItems: 0,
          items: {
            bsonType: "object",
            required: ["user_oid", "rating"],
            properties: {
              user_oid: {
                bsonType: "objectId",
                description: "must be an ObjectId and is required"
              },
              rating: {
                bsonType: "int",
                description: "must be an integer and is required"
              },
              comment: {
                bsonType: "string",
                description: "must be a string and is required"
              }
            }
          }
        }
      }
    }
  }
});

db.createCollection("Transaction", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_oid", "product_oid", "quantity", "date"],
      properties: {
        user_oid: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        },
        product_oid: {
          bsonType: "objectId",
          description: "must be an ObjectId and is required"
        },
        quantity: {
          bsonType: "int",
          description: "must be an integer and is required",
          minimum: 1
        },
        date: {
          bsonType: "date",
          description: "must be a date and is required"
        }
      },
    }
  }
});