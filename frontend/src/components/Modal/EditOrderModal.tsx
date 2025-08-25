import { Modal, Form, Alert, Button } from "react-bootstrap";
import { orderStatus } from "../../pages/Orders/interfaces/order.interface";
import type { EditOrderModalProps } from "./interfaces/global.interface";
import { useState } from "react";

function EditOrderModal({ show, onHide, order, onUpdateStatus, loading, error }: EditOrderModalProps) {
    const [newStatus, setNewStatus] = useState(order?.status || "");

    if (show && order && newStatus !== order.status) {
        setNewStatus(order.status);
    }

    const handleSubmit = () => {
        onUpdateStatus(newStatus);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Order Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error.message}</Alert>}
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        {orderStatus.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={loading || !newStatus || newStatus === order?.status}
                >
                    {loading ? "Updating..." : "Update Status"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditOrderModal;