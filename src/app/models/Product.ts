import mongoose, { Schema, Document } from "mongoose";
import { Product as ProductType } from "@/types";

// Extract ProductType without id because MongoDB will assign _id
export interface ProductDocument extends Document, Omit<ProductType, "id"> {}

const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      unique: true,
      sparse: true, // Хоосон утгыг зөвшөөрнө
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price_on_sale: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    image: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    id: false, // зөв!
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Transform _id to id when querying
ProductSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Виртуал талбарыг схемд нэмэх (id талбарыг үүсгэхгүй, зөвхөн GET хүсэлтэнд хариулахад _id-г id болгон хувиргана)
ProductSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Check if the model exists before creating a new one to prevent overwrite errors
const Product =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
