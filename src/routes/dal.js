const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QAP3FSJSID",
  password: "Keyin2021",
  port: 5432,
});

// Function to get all menu items from the database
const getAllMenuItems = async () => {
  const query = "SELECT * FROM menuItems";
  const { rows } = await pool.query(query);
  return rows;
};

// Function to get a menu item by ID from the database
const getMenuItemById = async (id) => {
  const query = "SELECT * FROM menuItems WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Function to create a new menu item in the database
const createMenuItem = async (newItem) => {
  const query = `
    INSERT INTO menuItems (name, description, price)
    VALUES ($1, $2, $3)
  `;
  const values = [newItem.name, newItem.description, newItem.price];
  await pool.query(query, values);
};

// Function to update a menu item by ID in the database
const updateMenuItem = async (itemId, updatedItem) => {
  const query = `
    UPDATE menuItems
    SET name = $1, description = $2, price = $3
    WHERE id = $4
  `;
  const values = [updatedItem.name, updatedItem.description, updatedItem.price, itemId];
  await pool.query(query, values);
};

// Function to delete a menu item by ID from the database
const deleteMenuItem = async (id) => {
  const query = "DELETE FROM menuItems WHERE id = $1";
  const values = [id];
  await pool.query(query, values);
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
