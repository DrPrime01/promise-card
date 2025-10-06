import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

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

    shareableId: {
      type: String,
      required: true,
      unique: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    items: [ItemSchema],
  },
  { timestamps: true }
);

ListSchema.pre("validate", function (next) {
  if (this.isNew) {
    const nanoid = customAlphabet(this._id.toString(), 8);
    this.shareableId = nanoid();
  }
  next();
});

export const List = mongoose.models?.List || mongoose.model("List", ListSchema);
