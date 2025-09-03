import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
    } catch (err) {
        throw new Error(err)
    }
}

export default connect