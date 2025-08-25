import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      inStock
    }
  }
`;

export const POST_PRODUCT = gql`
  mutation PostProduct($input: CreateProductDto!) {
    createProduct(input: $input) {
      id
      name
      price
      inStock
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      total
      status
      items {
        id
        quantity
        product {
          id
          name
        }
      }
    }
  }
`;

export const POST_ORDER = gql`
  mutation PostOrder($input: CreateOrderDto!) {
    createOrder(input: $input) {
      id
      total
      status
      items {
        id
        quantity
        product {
          id
          name
        }
      }
    }
  }
`;

export const PATCH_ORDER = gql`
  mutation UpdateOrderStatus($id: String!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
