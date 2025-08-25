// Order.tsx (atualizado)
import { useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ORDERS, GET_PRODUCTS, POST_ORDER, PATCH_ORDER } from "../../graphql/queries";
import type { OrderItemFromApi, OrderType } from "./interfaces/order.interface";
import type { ProductType } from "../Products/interfaces/products.interface";
import { RiEdit2Fill } from "react-icons/ri";
import CreateOrderModal from "../../components/Modal/CreateOrderModal";
import EditOrderModal from "../../components/Modal/EditOrderModal";

function Order() {
    const { data, loading, error, refetch } = useQuery<{ orders: OrderType[] }>(GET_ORDERS);
    const { data: productsData, loading: productsLoading, error: productsError } = useQuery<{ products: ProductType[] }>(GET_PRODUCTS);

    const [createOrder, { loading: creating, error: createError }] = useMutation(POST_ORDER);
    const [updateOrderStatus, { loading: updating, error: updateError }] = useMutation(PATCH_ORDER);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState<OrderType | null>(null);

    const handleCreateOrder = async (orderItems: OrderItemFromApi[]) => {
        try {
            await createOrder({
                variables: {
                    input: {
                        items: orderItems.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
                    },
                },
            });
            setShowCreateModal(false);
            refetch();
        } catch (err) {
            console.error("Error creating order:", err);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        if (!editingOrder) return;

        try {
            await updateOrderStatus({
                variables: {
                    id: editingOrder.id,
                    status: newStatus
                }
            });
            setShowEditModal(false);
            refetch();
        } catch (err) {
            console.error("Error updating order:", err);
        }
    };

    const handleEditClick = (order: OrderType) => {
        setEditingOrder(order);
        setShowEditModal(true);
    };

    if (loading || productsLoading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">Error loading orders: {error.message}</Alert></Container>;
    if (productsError) return <Container className="mt-5"><Alert variant="danger">Error loading products: {productsError.message}</Alert></Container>;

    return (
        <main>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Orders Page</h1>
                <div className="mb-3 text-end">
                    <Button onClick={() => setShowCreateModal(true)}>Create Order</Button>
                </div>
                <Table striped bordered hover>
                    <thead className="text-center">
                        <tr>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {data?.orders.map((order: any) => (
                            <tr key={order.id}>
                                <td>$ {order.total.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    {order.items?.map((i: any) => (
                                        <div key={i.id}>
                                            {i.product.name} x{i.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleEditClick(order)}
                                    >
                                        <RiEdit2Fill />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <CreateOrderModal
                    show={showCreateModal}
                    onHide={() => setShowCreateModal(false)}
                    products={productsData?.products || []}
                    onCreateOrder={handleCreateOrder}
                    loading={creating}
                    error={createError}
                />
                <EditOrderModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    order={editingOrder}
                    onUpdateStatus={handleUpdateStatus}
                    loading={updating}
                    error={updateError}
                />
            </Container>
        </main>
    );
}

export default Order;