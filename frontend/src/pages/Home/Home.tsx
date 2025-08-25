import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RiCoinsFill, RiGiftFill } from "react-icons/ri";
import './Home.css';

function Home() {
    return (
        <main>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Home Page</h1>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="h-100">
                        <Card className="text-center shadow-sm card-custom">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
                                <Card.Title>
                                    <RiGiftFill className="display-1 text-primary" />
                                </Card.Title>
                                <Card.Subtitle className="fs-2">Products</Card.Subtitle>
                                <Card.Text>
                                    View the list of available products in the system.
                                </Card.Text>
                                <LinkContainer to="/products">
                                    <Button variant="primary">Access Products</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={6} className="my-4 my-md-0">
                        <Card className="text-center shadow-sm card-custom">
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center h-100">
                                <Card.Title>
                                    <RiCoinsFill className="display-1 text-success" />
                                </Card.Title>
                                <Card.Subtitle className="fs-2">Orders</Card.Subtitle>
                                <Card.Text>
                                    Manage and track placed orders.
                                </Card.Text>
                                <LinkContainer to="/orders">
                                    <Button variant="success">Access Orders</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Home;