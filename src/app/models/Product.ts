import mongoose, { Schema, Document } from "mongoose";
import { Product as ProductType } from "@/types";

// ProductDocument interface өргөтгөх (одоо байгаа интерфейс байвал түүнд нэмэх)
export interface ProductDocument extends Document, Omit<ProductType, "id"> {
  brand?: string;
  color?: string;
}

// Автоматаар SKU үүсгэх функц
function generateSKU(product: any): string {
  // Brand (2 тэмдэгт)
  const brandPrefix = product.brand 
    ? product.brand.substring(0, 2).toUpperCase() 
    : 'MN'; // Default: Mongolz
  
  // Category (2 тэмдэгт)
  const categoryPrefix = product.category 
    ? product.category.substring(0, 2).toUpperCase() 
    : 'XX';
    
  // Color (1 тэмдэгт)
  const colorCode = product.color 
    ? product.color.substring(0, 1).toUpperCase() 
    : 'X';
    
  // Size (1 тэмдэгт)
  const sizeCode = product.sizes && product.sizes.length > 0
    ? product.sizes[0].substring(0, 1).toUpperCase()
    : 'X';
  
  // Санамсаргүй тоо (4 оронтой)
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // Timestamp (сүүлийн 4 цифр)
  const timestamp = Date.now().toString().slice(-4);
  
  // Өвөрмөц SKU формат: BRAND-CATEGORY-COLOR-SIZE-RANDOM-TIMESTAMP
  return `${brandPrefix}${categoryPrefix}${colorCode}${sizeCode}-${randomNum}-${timestamp}`;
}

// Schema-д color, brand нэмэх (одоо байгаа Schema-д нэмнэ)
const ProductSchema = new Schema(
  {
    sku: {
      type: String,
      unique: true,
      sparse: true, // Хоосон утгыг зөвшөөрнө
      trim: true,
      index: true
    },
    brand: {
      type: String,
      trim: true,
      default: "Mongolz"
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
    color: {
      type: String,
      default: "black"
    },
    image: {
      type: String,
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0
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

// pre-save хүк нэмэх - Хэрэв одоо байгаа pre-save hook байвал түүнд нэмнэ, эсвэл шинээр бичнэ
ProductSchema.pre("save", function(next) {
  // Хэрэв тоо ширхэг 0-с их бол inStock = true
  if (this.quantity > 0) {
    this.inStock = true;
  } else {
    this.inStock = false;
  }
  
  // Хэрэв SKU хоосон утга бол null болгох
  if (this.sku === "") {
    this.sku = null;
  }
  
  // Хэрэв SKU null эсвэл undefined бол автоматаар үүсгэх
  if (this.sku === null || this.sku === undefined) {
    this.sku = generateSKU(this);
  }
  
  next();
});

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
