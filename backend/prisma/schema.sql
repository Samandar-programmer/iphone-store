-- products jadvali
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    model VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    storage VARCHAR(20) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    stock INTEGER NOT NULL DEFAULT 0
);

-- orders jadvali
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- order_items jadvali (orders va products bilan bog'langan)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL
);
