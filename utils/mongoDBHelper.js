const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

let db;

// ✅ Singleton DB connection
async function getDB() {
    if (!db) {
        await client.connect();
        db = client.db('skillswip'); // your DB name
        console.log('✅ MongoDB connected - mongoDBHelper.js:12');
    }
    return db;
}

// ✅ Get email verification token
async function getEmailVerifyToken(email) {
    const database = await getDB();

    const user = await database.collection('users').findOne(
        { email },
        { projection: { email_verify_token: 1 } }
    );

    return user?.email_verify_token;
}

// (Optional but useful)
async function getUserByEmail(email) {
    const database = await getDB();
    return await database.collection('users').findOne({ email });
}

module.exports = {
    getEmailVerifyToken,
    getUserByEmail
};