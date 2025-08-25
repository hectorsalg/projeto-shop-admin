import type { ProductType } from "../../../pages/Products/interfaces/products.interface";
import type { OrderItemFromApi, OrderType } from "../../../pages/Orders/interfaces/order.interface";

export interface ProductModalProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (formData: { name: string; price: string; inStock: boolean }) => Promise<void>;
    loading: boolean;
    error?: Error;
}

export interface CreateOrderModalProps {
    show: boolean;
    onHide: () => void;
    products: ProductType[];
    onCreateOrder: (orderItems: OrderItemFromApi[]) => Promise<void>;
    loading: boolean;
    error?: Error;
}

export interface EditOrderModalProps {
    show: boolean;
    onHide: () => void;
    order: OrderType | null;
    onUpdateStatus: (newStatus: string) => Promise<void>;
    loading: boolean;
    error?: Error;
}
