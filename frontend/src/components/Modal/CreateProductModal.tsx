import { Modal, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import type { ProductModalProps } from "./interfaces/global.interface";

function ProductModal({ show, onHide, onSubmit, loading, error }: ProductModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        inStock: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleClose = () => {
        setFormData({ name: "", price: "", inStock: false });
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Product</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error.message}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            placeholder="Enter product name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            placeholder="00.00"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="switch"
                            label="In Stock"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            className="custom-switch"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ProductModal;