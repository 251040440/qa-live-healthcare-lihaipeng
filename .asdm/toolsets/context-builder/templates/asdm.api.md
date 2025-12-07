# API Documentation

## Overview
This document provides comprehensive API documentation for this workspace. It includes endpoint definitions, request/response formats, and usage examples.

## API Base Information

### Base URLs
- **Development**: `http://localhost:3000/api`
- **Staging**: `https://staging-api.example.com/api`
- **Production**: `https://api.example.com/api`

### Authentication
All protected endpoints require JWT authentication:
```http
Authorization: Bearer <jwt_token>
```

### Rate Limiting
- Standard: 100 requests/15 minutes per IP
- Authenticated: 1000 requests/15 minutes per user

### Common Headers
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
X-Request-ID: <unique_id>
```

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123"
}
```

## Authentication Endpoints

### POST /auth/login
Authenticate user and get JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["USER"]
  },
  "expiresIn": 3600
}
```

### POST /auth/register
Register new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "Password123!",
  "name": "New User",
  "confirmPassword": "Password123!"
}
```

**Response:**
```json
{
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "New User",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "verificationRequired": true
}
```

## User Endpoints

### GET /users/me
Get current user profile.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "profile": {
    "avatarUrl": "https://example.com/avatar.jpg",
    "phoneNumber": "+1234567890",
    "address": "123 Main St, City, Country"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### PUT /users/me
Update user profile.

**Request:**
```json
{
  "name": "Updated Name",
  "profile": {
    "phoneNumber": "+0987654321",
    "address": "456 Oak St, City, Country"
  }
}
```

## Product Endpoints

### GET /products
Get paginated list of products.

**Query Parameters:**
- `category` (optional): Filter by category ID
- `search` (optional): Search in name/description
- `minPrice`, `maxPrice` (optional): Price range
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "products": [
    {
      "id": 101,
      "sku": "ELEC-001",
      "name": "Wireless Headphones",
      "description": "Noise-cancelling headphones",
      "price": 129.99,
      "stockQuantity": 50,
      "category": {
        "id": 5,
        "name": "Electronics",
        "slug": "electronics"
      },
      "images": [
        {
          "url": "https://example.com/products/headphones.jpg",
          "altText": "Wireless Headphones"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### GET /products/{id}
Get product details.

**Response:**
```json
{
  "id": 101,
  "sku": "ELEC-001",
  "name": "Wireless Headphones",
  "description": "Noise-cancelling wireless headphones...",
  "price": 129.99,
  "stockQuantity": 50,
  "category": {
    "id": 5,
    "name": "Electronics",
    "slug": "electronics"
  },
  "images": [
    {
      "url": "https://example.com/products/headphones-1.jpg",
      "altText": "Front view",
      "isPrimary": true
    }
  ],
  "attributes": [
    {
      "name": "Color",
      "value": "Black"
    },
    {
      "name": "Battery Life",
      "value": "30 hours"
    }
  ]
}
```

## Order Endpoints

### POST /orders
Create new order.

**Request:**
```json
{
  "items": [
    {
      "productId": 101,
      "quantity": 2
    },
    {
      "productId": 102,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Response:**
```json
{
  "id": 1001,
  "orderNumber": "ORD-2024-001",
  "status": "PENDING",
  "totalAmount": 459.97,
  "items": [
    {
      "productId": 101,
      "name": "Wireless Headphones",
      "quantity": 2,
      "unitPrice": 129.99,
      "subtotal": 259.98
    }
  ],
  "estimatedDelivery": "2024-01-25T00:00:00Z"
}
```

### GET /orders
Get user's orders.

**Query Parameters:**
- `status` (optional): Filter by status
- `page`, `limit` (optional): Pagination

**Response:**
```json
{
  "orders": [
    {
      "id": 1001,
      "orderNumber": "ORD-2024-001",
      "totalAmount": 259.98,
      "status": "DELIVERED",
      "orderDate": "2024-01-20T14:30:00Z",
      "itemCount": 2
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

## Category Endpoints

### GET /categories
Get category hierarchy.

**Response:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "description": "Electronic devices and accessories",
      "children": [
        {
          "id": 5,
          "name": "Audio",
          "slug": "audio",
          "productCount": 32
        }
      ],
      "productCount": 89
    }
  ]
}
```

## Webhook Endpoints

### POST /webhooks/payment
Handle payment webhook notifications.

**Headers:**
```http
X-Webhook-Signature: <signature>
X-Webhook-Timestamp: <timestamp>
```

**Request:**
```json
{
  "event": "payment.succeeded",
  "data": {
    "paymentId": "pay_123",
    "orderId": "ORD-2024-001",
    "amount": 459.97,
    "currency": "USD",
    "timestamp": "2024-01-20T14:35:00Z"
  }
}
```

**Response:**
```json
{
  "processed": true,
  "orderUpdated": true
}
```

## SDK Examples

### JavaScript/TypeScript
```javascript
import { ApiClient } from './api-client';

const api = new ApiClient({
  baseUrl: process.env.API_BASE_URL,
  token: localStorage.getItem('token')
});

// Example: Create order
async function createOrder(items, shippingAddress) {
  try {
    const order = await api.post('/orders', {
      items,
      shippingAddress,
      paymentMethod: 'credit_card'
    });
    return order;
  } catch (error) {
    if (error.code === 'UNAUTHORIZED') {
      // Redirect to login
      window.location.href = '/login';
    }
    throw error;
  }
}

// Example: Get products with filters
async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`/products?${queryParams}`);
}
```

### Python
```python
import requests
from typing import Dict, Any

class ApiClient:
    def __init__(self, base_url: str, token: str = None):
        self.base_url = base_url
        self.token = token
    
    def _headers(self) -> Dict[str, str]:
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        return headers
    
    def get_products(self, category_id: int = None, page: int = 1) -> Dict[str, Any]:
        params = {'page': page}
        if category_id:
            params['category'] = category_id
        
        response = requests.get(
            f'{self.base_url}/products',
            params=params,
            headers=self._headers()
        )
        response.raise_for_status()
        return response.json()
```

## Testing Examples

### cURL Examples
```bash
# Login
curl -X POST https://api.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get products
curl -X GET https://api.example.com/api/products?category=5&page=1 \
  -H "Authorization: Bearer <token>"

# Create order
curl -X POST https://api.example.com/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"items":[{"productId":101,"quantity":2}],"shippingAddress":{"street":"123 Main St","city":"New York","state":"NY","postalCode":"10001","country":"USA"},"paymentMethod":"credit_card"}'
```

### Postman Collection
```json
{
  "info": {
    "name": "E-commerce API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

## Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (e.g., duplicate email) |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Versioning
API version is included in the URL path: `/api/v1/endpoint`

## Changelog
| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2024-01-01 | Initial API release |
| v1.1.0 | 2024-02-01 | Added webhook endpoints, improved error handling |

---

*This API documentation should be updated whenever endpoints change. Use `/context-update-instruction` to keep this document current.*