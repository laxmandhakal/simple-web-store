export class Item {
    name?: string;
    category?: string;
    brand?: string;
    price?: string;
    description?: string;
    color: string;
    tags: string;
    quantity: number;
    size: string;
    image: string;
    origin: string;
    discountedItem: boolean;
    discountType: string;
    discountUnit: string;
    createdAt: string;
    updatedAt: string;
    model: number;
    user: string;
    minPrice: number;
    maxPrice: number;
    _id: string;
    constructor(details: any) {

        for (let key in details) {
            this[key] = details[key];
        }
    }
}