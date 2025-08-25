import { useState, useEffect } from "react";
import { Modal, Form, Alert, Button, Row, Col } from "react-bootstrap";
import type { OrderItemFromApi } from "../../pages/Orders/interfaces/order.interface";
import type { CreateOrderModalProps } from "./interfaces/global.interface";

function CreateOrderModal({ show, onHide, products, onCreateOrder, loading, error }: CreateOrderModalProps) {
    const [orderItems, setOrderItems] = useState<OrderItemFromApi[]>([
        { id: "", product: { id: "", name: "" }, quantity: 1 }
    ]);

    const previewTotal = orderItems.reduce((sum, item) => {
        const product = products.find(p => p.id === item.product.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    useEffect(() => {
        if (show) {
            setOrderItems([{ id: "", product: { id: "", name: "" }, quantity: 1 }]);
        }
    }, [show]);

    const handleAddItem = () => {
        setOrderItems(prev => [...prev, { id: "", product: { id: "", name: "", price: 0, inStock: false }, quantity: 1 }]);
    };

    const handleItemChange = (index: number, field: "product.id" | "quantity", value: string | number) => {
        const newItems = [...orderItems];
        if (field === "product.id") {
            const productId = value as string;
            const product = products.find(p => p.id === productId);
            newItems[index].product = product ? { ...product } : { id: "", name: "", price: 0, inStock: false };
        } else {
            newItems[index].quantity = Number(value);
        }
        setOrderItems(newItems);
    };

    const handleRemoveItem = (index: number) => {
        setOrderItems(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        onCreateOrder(orderItems);
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error.message}</Alert>}
                <Form>
                    {orderItems.map((item, index) => (
                        <Row key={index} className="mb-3 align-items-end">
                            <Col md={5}>
                                <Form.Label>Product</Form.Label>
                                <Form.Select
                                    value={item.product.id}
                                    onChange={(e) => handleItemChange(index, "product.id", e.target.value)}
                                >
                                    <option value="">Select a product</option>
                                    {products.map((p) => (
                                        <option
                                            key={p.id}
                                            value={p.id}
                                            disabled={!p.inStock}
                                        >
                                            {p.name} — $ {p.price.toFixed(2)}
                                            {!p.inStock ? " (out of stock)" : ""}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                />
                            </Col>
                            <Col md={2} className="mt-3 align-content-end d-flex">
                                <Button
                                    variant="danger"
                                    onClick={() => handleRemoveItem(index)}
                                    disabled={orderItems.length <= 1}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="primary" onClick={handleAddItem}>
                        Add Item
                    </Button>
                    <Form.Group className="mt-3">
                        <Form.Label>Total: $ {previewTotal.toFixed(2)}</Form.Label>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={loading || orderItems.length === 0 || orderItems.some((i) => !i.product.id || i.quantity < 1)}
                >
                    {loading ? "Creating..." : "Create Order"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateOrderModal;