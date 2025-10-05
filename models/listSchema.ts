import mongoose from "mongoose";

const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    isPromised: {
      type: Boolean,
      default: false,
    },

    promisedBy: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const ListSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    occasion: {
      type: String,
      trim: true,
    },

    items: [ItemSchema],
  },
  { timestamps: true }
);

export const List = mongoose.models?.List || mongoose.model("List", ListSchema);
