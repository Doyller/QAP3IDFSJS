const express = require("express");
const router = express.Router();
const dal = require("./dal");

// View route to render the index page
router.get("/", async (req, res) => {
  try {
    const menuItems = await dal.getAllMenuItems();
    res.render("index", { menuItems });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// View route to render the add_item page
router.get("/add_item", (req, res) => {
  res.render("add_item");
});

// View route to render the edit_item page
router.get("/:id/edit_item", async (req, res) => {
  try {
    const menuItem = await dal.getMenuItemById(req.params.id);
    if (!menuItem) {
      return res.status(404).send("Menu item not found");
    }
    res.render("edit_item", { item: menuItem });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
