import Item from "../models/Item";
import Supplier from "../models/Supplier";

export async function getInventoryContext() {
    const [items, suppliers] = await Promise.all([
        Item.find().lean(),
        Supplier.find().lean()
    ]);

    return {
        items: items.map((item) => ({
            id: item._id.toString(),
            itemName: item.itemName,
            supplierID: item.supplierID.toString(),
            supplierPrice: item.supplierPrice,
            deliveredQuantity: item.deliveredQuantity,
            itemType: item.itemType
        })),

        suppliers: suppliers.map((supplier) => ({
            id: supplier._id.toString(),
            supplier_name: supplier.supplier_name,
            type: supplier.type
        }))
    };
}