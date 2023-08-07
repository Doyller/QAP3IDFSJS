const express = require("express");
const router = express.Router();
const dal = require("./dal");

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await dal.getAllMenuItems();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST new menu item
router.post("/", async (req, res) => {
  try {
    const newItem = req.body;
    await dal.createMenuItem(newItem);
    res.redirect("/menuItems");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT update menu item by ID
router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    await dal.updateMenuItem(itemId, updatedItem);
    res.redirect("/menuItems");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE menu item by ID
router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    await dal.deleteMenuItem(itemId);
    res.redirect("/menuItems");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
