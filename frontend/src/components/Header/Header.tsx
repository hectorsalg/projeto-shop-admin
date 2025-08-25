import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Navbar bg="light" data-bs-theme="light" className='shadow-sm mb-3'>
                <Container>
                    <Navbar.Brand as={Link} to="/">Shop Admin</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
