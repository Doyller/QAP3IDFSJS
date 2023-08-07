CREATE OR REPLACE VIEW public.menuItems
 AS
SELECT menuItems.name AS item_name, menuItems.price, categories.name AS category_name
FROM menuItems
JOIN categories ON menuItems.category_id = categories.id;

