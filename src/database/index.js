import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nehalpradhan23:nehalpradhan23@cluster0.u8vmg19.mongodb.net/"
    );
    console.log("mongodb connected");
  } catch (e) {
    console.log(e);
  }
};

export default connectToDB;
