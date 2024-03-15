import mongoose, { connect } from 'mongoose';
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then((connect) => {
      console.log(`data base conntect to :${connect.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export default connectDB;
