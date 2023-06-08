const express = require("express");
const router = new express.Router();

const items = [{"name": "popcorn",
"price": 2}, {"name": "butter", "price": 0.50}];



router.get("/", function(req, res) {
  return res.json(items);
});


router.delete("/:id", function(req, res) {
  const idx = users.findIndex(u => u.id === +req.params.id);
  users.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
