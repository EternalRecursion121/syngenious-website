import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: String,
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: String,
    logo: String
});

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;