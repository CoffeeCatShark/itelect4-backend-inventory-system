
import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
    supplier_name: string;
    type: "Appliances" | "Tools" | "Furnitures";
}

const SupplierSchema = new Schema<ISupplier>(
    {
        supplier_name: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["Appliances", "Tools", "Furnitures"]
        }
    },
    {
        timestamps: true
    }
);

const Supplier = mongoose.model<ISupplier>(
    "Supplier",
    SupplierSchema
);

export default Supplier;
