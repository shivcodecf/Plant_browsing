import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
     categories: {
        
      type: [String],
      required: true,
      default:false,
     
    },

    stock: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Plant = mongoose.model("Plant", plantSchema);
