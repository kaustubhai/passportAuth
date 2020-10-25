const password = process.env.MONGO_PASSWORD
module.exports = {
    MongoURI: `mongodb+srv://kaustubhai:${password}@cluster0.0jfy4.mongodb.net/cluster0?retryWrites=true&w=majority`
}