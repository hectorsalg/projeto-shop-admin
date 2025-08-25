import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import client from './apolloClient';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
