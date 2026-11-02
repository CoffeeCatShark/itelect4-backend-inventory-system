
import mongoose, { Schema, Document } from "mongoose";

export interface IItem extends Document {
    itemName: string;
    supplierID: mongoose.Types.ObjectId;
    supplierPrice: number;
    deliveredQuantity: number;
    itemType: "Appliances" | "Tools" | "Furnitures";
}

const ItemSchema = new Schema<IItem>(
    {
        itemName: {
            type: String,
            required: true,
            trim: true
        },

        supplierID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Supplier"
        },

        supplierPrice: {
            type: Number,
            required: true,
            min: 0
        },

        deliveredQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        itemType: {
            type: String,
            required: true,
            enum: ["Appliances", "Tools", "Furnitures"]
        }
    },
    {
        timestamps: true
    }
);

const Item = mongoose.model<IItem>("Item", ItemSchema);

export default Item;
