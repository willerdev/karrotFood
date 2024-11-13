-- Insert sample categories
INSERT INTO categories (name, icon, image_url) VALUES
('Japanese', '🍱', 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&q=80&w=800'),
('American', '🍔', 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=800'),
('Italian', '🍕', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800'),
('Mexican', '🌮', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800'),
('Chinese', '🥡', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800'),
('Indian', '🍛', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800');

-- Insert sample restaurants
INSERT INTO restaurants (name, description, image_url, cuisine, rating, delivery_time, delivery_fee, featured, category_id)
SELECT
    'Sushi Master',
    'Authentic Japanese cuisine with fresh ingredients',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    'Japanese',
    4.8,
    '25-35',
    3.99,
    true,
    id
FROM categories WHERE name = 'Japanese';

INSERT INTO restaurants (name, description, image_url, cuisine, rating, delivery_time, delivery_fee, featured, category_id)
SELECT
    'Burger House',
    'Premium burgers made with quality ingredients',
    'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&q=80&w=800',
    'American',
    4.5,
    '20-30',
    2.99,
    true,
    id
FROM categories WHERE name = 'American';

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category)
SELECT
    id as restaurant_id,
    'Dragon Roll',
    'Shrimp tempura, avocado, cucumber, topped with eel and spicy mayo',
    16.99,
    'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&q=80&w=800',
    'Sushi Rolls'
FROM restaurants
WHERE name = 'Sushi Master';

INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category)
SELECT
    id as restaurant_id,
    'Classic Cheeseburger',
    'Angus beef patty, cheddar cheese, lettuce, tomato, special sauce',
    12.99,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    'Burgers'
FROM restaurants
WHERE name = 'Burger House';