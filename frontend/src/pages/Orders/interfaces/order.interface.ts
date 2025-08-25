export interface OrderItemFromApi {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
    };
}

export interface OrderType {
    id: string;
    total: number;
    status: string;
    items: { id: string; product: { id: string; name: string }; quantity: number }[];
}

export const orderStatus = ["PENDING", "PAID", "SHIPPED"];