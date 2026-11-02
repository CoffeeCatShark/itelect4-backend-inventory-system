import { Request, Response } from "express";
import mongoose from "mongoose";
import Supplier from "../models/Supplier";

// GET all suppliers
export const getSuppliers = async (_req: Request, res: Response) => {
    try {
        const suppliers = await Supplier.find();

        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve suppliers",
            error
        });
    }
};

// GET supplier by ID
export const getSupplierById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid supplier ID"
            });
        }

        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve supplier",
            error
        });
    }
};

// CREATE supplier
export const createSupplier = async (req: Request, res: Response) => {
    try {
        const newSupplier = await Supplier.create(req.body);

        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create supplier",
            error
        });
    }
};

// UPDATE supplier
export const updateSupplier = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid supplier ID"
            });
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSupplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(400).json({
            message: "Failed to update supplier",
            error
        });
    }
};

// DELETE supplier
export const deleteSupplier = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid supplier ID"
            });
        }

        const deletedSupplier = await Supplier.findByIdAndDelete(
            req.params.id
        );

        if (!deletedSupplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        }

        res.status(200).json({
            message: "Supplier deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete supplier",
            error
        });
    }
};