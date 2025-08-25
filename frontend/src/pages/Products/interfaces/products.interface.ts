export interface ProductType {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
}

export interface ProductsData {
    products: ProductType[];
}

export interface CreateProductInput {
    name: string;
    price: number;
    inStock: boolean;
}

export interface CreateProductResponse {
    createProduct: ProductType;
}