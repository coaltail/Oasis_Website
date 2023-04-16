import mongoose from "mongoose";
const connectToDatabase = (uri) =>
{
    mongoose.set('strictQuery', true);

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(error))
}
export default connectToDatabase