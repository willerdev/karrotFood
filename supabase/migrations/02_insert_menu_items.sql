-- First, let's create a new restaurant category for African/Rwandan cuisine
INSERT INTO categories (name, icon, image_url)
VALUES (
  'African',
  '🍲',
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8444?auto=format&fit=crop&q=80&w=800'
);

-- Create the restaurant
INSERT INTO restaurants (
  name,
  description,
  image_url,
  cuisine,
  rating,
  delivery_time,
  delivery_fee,
  featured,
  category_id
)
SELECT
  'Office Eats Rwanda',
  'Authentic Rwandan and International cuisine with daily specials',
  'https://images.unsplash.com/photo-1604329760661-e71dc83f8444?auto=format&fit=crop&q=80&w=800',
  'African',
  4.7,
  '30-45',
  2.99,
  true,
  id
FROM categories WHERE name = 'African';

-- Insert menu items
WITH restaurant_id AS (
  SELECT id FROM restaurants WHERE name = 'Office Eats Rwanda' LIMIT 1
)
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category)
VALUES
  ((SELECT id FROM restaurant_id), 'Beef Stir-Fry', 'With a daily snack', 4900, 'https://www.officeats.rw/storage/dishes/May2023/KxAMrrfu3V56iuhQ3l7n.jpeg', 'Main Dishes'),
  ((SELECT id FROM restaurant_id), 'Chicken Stir-Fry', 'With a daily snack', 4900, 'https://www.officeats.rw/storage/dishes/May2023/v9qoeEDMogWuM8UfDXrx.jpeg', 'Main Dishes'),
  ((SELECT id FROM restaurant_id), 'Beef Burger', 'with vegetables & chips', 5500, 'https://www.officeats.rw/storage/dishes/May2023/3ai6fcDkqTEstlvcY5GO.jpg', 'Burgers'),
  ((SELECT id FROM restaurant_id), 'Mushroom Soup', 'With 1 bread', 3500, 'https://www.officeats.rw/storage/dishes/June2023/QpIPNK8Y6H3tKiZoa69t.jpeg', 'Soups'),
  ((SELECT id FROM restaurant_id), 'Chips Masala', 'With Beef & Vegetables', 4000, 'https://www.officeats.rw/storage/dishes/June2023/d7vnguWoGNBAzZvSeFCY.jpeg', 'Sides'),
  ((SELECT id FROM restaurant_id), 'Nicoise Salad', 'With Eggs & Green Vegetables', 4000, 'https://www.officeats.rw/storage/dishes/June2023/5v02hZYUzRu2ec2o7m10.webp', 'Salads'),
  ((SELECT id FROM restaurant_id), 'Chef Salad', 'With Eggs, meats & Green Vegetables', 4000, 'https://www.officeats.rw/storage/dishes/June2023/K4zIxNmmlrGCFLS6KIb5.jpeg', 'Salads'),
  ((SELECT id FROM restaurant_id), 'Shawarma Wrap', 'Buy 1 get 1 free', 6000, 'https://www.officeats.rw/storage/dishes/July2023/po6IgfCJnGH8zzRRIlzt.jpeg', 'Wraps'),
  ((SELECT id FROM restaurant_id), 'Chicken Wrap', 'Buy 1 get 1 free', 5000, 'https://www.officeats.rw/storage/dishes/July2023/YdEcXN5yZvWY2WwfvA9F.jpeg', 'Wraps'),
  ((SELECT id FROM restaurant_id), 'Beef Wrap', 'Buy 1 get 1 free', 5000, 'https://www.officeats.rw/storage/dishes/July2023/9uOTUajNgNvmL8BAaNiZ.jpeg', 'Wraps'),
  ((SELECT id FROM restaurant_id), 'Chicken Burger', 'with vegetables & chips', 6000, 'https://www.officeats.rw/storage/dishes/July2023/APY1OrL75FeEXTwRsn1Q.jpeg', 'Burgers'),
  ((SELECT id FROM restaurant_id), 'Chicken Medallions', 'With Vegetables + Chapati', 4900, 'https://www.officeats.rw/storage/dishes/November2023/trkaQwr1xIUByqCJ4xOR.jpeg', 'Main Dishes'),
  ((SELECT id FROM restaurant_id), 'Monday Meal', 'Roasted Chicken Masala, Plain White Rice, French Fries, Creamed Spinach', 4900, 'https://www.officeats.rw/storage/dishes/January2024/IFjJKldzIbMXJnIitmTb.png', 'Daily Specials'),
  ((SELECT id FROM restaurant_id), 'Tuesday Meal', 'Beef Bercarbonade, Egg Fried Rice, Lyonnaise Potatoes, Peas with Carrots', 4900, 'https://www.officeats.rw/storage/dishes/January2024/OErbhJ6kTp6FLvmgzg9U.png', 'Daily Specials'),
  ((SELECT id FROM restaurant_id), 'Wednesday Meal', 'Burger Steak with Mushroom Sauce Gravy, Pilau Rice, Banana Fries, Green Beans with Carrot', 4900, 'https://www.officeats.rw/storage/dishes/January2024/LMwIr1Zg2yXdfHEHZzrr.png', 'Daily Specials'),
  ((SELECT id FROM restaurant_id), 'Thursday Meal', 'Beef Stew, Crushed potatoes, Vegetable temperament, Rice Creole', 4900, 'https://www.officeats.rw/storage/dishes/January2024/S80vmsVMWSvTOJeL08U0.png', 'Daily Specials'),
  ((SELECT id FROM restaurant_id), 'Friday Meal', 'Beef Brochette, Mixed Salad, Vegetable Rice, Baked Potatoes, Red Tomato Sauce, Penne Pasta', 4900, 'https://www.officeats.rw/storage/dishes/January2024/fAJPyKNp1mwK7XqPGEcZ.png', 'Daily Specials'),
  ((SELECT id FROM restaurant_id), 'Mango Fresh Juice', '', 3000, 'https://www.officeats.rw/storage/dishes/January2024/h4JtlA5H5jLa5u7omodQ.png', 'Beverages'),
  ((SELECT id FROM restaurant_id), 'Cocktail Fresh Juice', '', 3500, 'https://www.officeats.rw/storage/dishes/January2024/ycyogTve7RIYDVxGAv5n.png', 'Beverages'),
  ((SELECT id FROM restaurant_id), 'Special Full Fish - 1.2 kg', 'With 2 Chips Salads', 15000, 'https://www.officeats.rw/storage/dishes/February2024/fp6qvC1mh0Uau6NMK8UE.jpg', 'Specials'),
  ((SELECT id FROM restaurant_id), 'Special Full Chicken', 'With 2 chips + 2 rice plates', 20000, 'https://www.officeats.rw/storage/dishes/March2024/c7p3JcKeywEsq8Zauxnr.png', 'Specials'),
  ((SELECT id FROM restaurant_id), 'Beef Cubes Mama Style', 'With Fried Potatoes', 12000, 'https://www.officeats.rw/storage/dishes/April2024/WXR0FSU03vsJfpAKeLWV.jpeg', 'Specials'),
  ((SELECT id FROM restaurant_id), 'Beef Burger', 'With Chips Box', 6500, 'https://www.officeats.rw/storage/dishes/July2024/dnQjtVAfoAh9BIo7ic2l.jpeg', 'Burgers'),
  ((SELECT id FROM restaurant_id), 'Masala Loaded Fries', 'Chips, Cheese, Chicken or Beef with masala', 6000, 'https://www.officeats.rw/storage/dishes/September2024/wM1T3iDvuwAxJJUCMYHk.png', 'Sides');