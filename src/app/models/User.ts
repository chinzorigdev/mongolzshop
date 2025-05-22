import mongoose, { Document, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "superadmin";
  comparePassword(candidatePassword: string): Promise<boolean>;
  // ... нэмэлт талбарууд
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    // ... нэмэлт талбарууд (нэр, утас, хаяг гэх мэт)
  },
  {
    timestamps: true,
    id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Password хэшлэх
UserSchema.pre("save", async function (next) {
  const user = this as typeof this & {
    isModified: (field: string) => boolean;
    password: string;
  };

  // Хэрэв password өөрчлөгдөөгүй бол дараагийн алхамд шилжих
  if (!user.isModified("password")) return next();

  try {
    // Password хэшлэх - salt rounds 10
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch {
    // error: unknown instead of any, but not used
    return next(new Error("Password hashing failed"));
  }
});

// Password шалгах метод
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await compare(candidatePassword, this.password);
  } catch {
    return false;
  }
};

// Transform _id to id when querying
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Check if the model exists before creating a new one to prevent overwrite errors
const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;

// If you still get a missing type error for bcrypt, add the following at the top of the file or in a global.d.ts:
// declare module 'bcrypt';
