import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTS, POST_PRODUCT } from "../../graphql/queries";
import { useState } from "react";
import type { CreateProductInput, CreateProductResponse, ProductsData, ProductType } from "./interfaces/products.interface";
import ProductModal from "../../components/Modal/CreateProductModal";
import "./Products.css";

function Product() {
    const { data, loading, error, refetch } = useQuery<ProductsData>(GET_PRODUCTS);
    const [showModal, setShowModal] = useState(false);
    const [createProduct, { loading: creating, error: mutationError }] = useMutation<CreateProductResponse, 
        { input: CreateProductInput } >(POST_PRODUCT, {
        update(cache, { data }) {
            if (data) {
                const existingProducts = cache.readQuery<ProductsData>({ query: GET_PRODUCTS });
                if (existingProducts) {
                    cache.writeQuery({
                        query: GET_PRODUCTS,
                        data: { products: [...existingProducts.products, data.createProduct] }
                    });
                }
            }
        }
    });

    const handleSubmit = async (formData: { name: string; price: string; inStock: boolean }) => {
        try {
            await createProduct({
                variables: {
                    input: {
                        name: formData.name,
                        price: parseFloat(formData.price),
                        inStock: formData.inStock
                    }
                }
            });
            setShowModal(false);
            refetch();
        } catch (err) {
            console.error("Error:", err);
        }
    };

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">Error loading products: {error.message}</Alert></Container>;

    return (
        <main>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Products Page</h1>
                <div className="mb-3 text-end">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Create Product
                    </Button>
                </div>
                <Table striped bordered hover className="mt-3">
                    <thead className="text-center">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>In Stock</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {data?.products.map((p: ProductType) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>$ {p.price.toFixed(2)}</td>
                                <td>{p.inStock ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ProductModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                    loading={creating}
                    error={mutationError}
                />
            </Container>
        </main>
    );
}

export default Product;