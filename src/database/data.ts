import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// export const mongoDBConnection = async () => {
//   const mongoDbUrl = process.env.MONGODB_URL;

//   if (!mongoDbUrl) {
//     throw new Error("MONGODB_URL is not defined in environment variables");
//   }

//   try {
//     const client = await MongoClient.connect(mongoDbUrl, {
//       // You can add other options here if needed
//     });

//     console.log("DB connected");
//     const database = client.db();
//     const collection = database.collection("trash");

//     let dataFromMongo = await collection.find().toArray();
//     console.log(dataFromMongo);

//     // Don't forget to close the client connection after your operations
//     await client.close();
//   } catch (error) {
//     console.error("Error connecting to the database: ", error);
//     throw error;
//   }
// };

export const PostDataToMongoDB = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;

  if (!mongoDbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  try {
    const client = await MongoClient.connect(mongoDbUrl, {
      // Add other options if needed
    });

    console.log("DB connected");
    const database = client.db();
    const collection = database.collection("trash");

    // Update document with name "Paul" to "Mark" and email to "Mark@gmail.com"
    const updateResult = await collection.updateOne(
      { name: "Paul" },
      { $set: { name: "Mark", email: "Mark@gmail.com" } }
    );

    console.log(`${updateResult.modifiedCount} document(s) updated`);

    // Fetch and log all documents in the collection after update
    const dataFromMongo = await collection.find().toArray();
    console.log("Data in the 'trash' collection after update:", dataFromMongo);

    // Close the client connection after your operations
    await client.close();
    console.log("DB connection closed");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    throw error;
  }
};

// Example call to the function
PostDataToMongoDB().catch(console.error);
