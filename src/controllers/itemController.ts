
import { Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";

// GET items
export const getItems = async (req: Request, res: Response) => {
    try {
        const { supplierID } = req.query;

        const filter = supplierID
            ? { supplierID: supplierID as string }
            : {};

        const items = await Item.find(filter);

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve items",
            error
        });
    }
};

// GET item by ID
export const getItemById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid item ID"
            });
        }

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve item",
            error
        });
    }
};

// CREATE item
export const createItem = async (req: Request, res: Response) => {
    try {
        const newItem = await Item.create(req.body);

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create item",
            error
        });
    }
};

// UPDATE item
export const updateItem = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: "Failed to update item", error });
    }
};

// DELETE item
export const deleteItem = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
};
