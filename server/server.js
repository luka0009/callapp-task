const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require('cors');
// const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

let jsonData = fs.readFileSync("data.json");
let data = JSON.parse(jsonData);

app.use(bodyParser.json());
app.use(cors());

app.get("/data", (req, res) => {
  res.send(data);
});

app.get("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = data.find((item) => item.id === id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.send(item);
});

app.post("/data", (req, res) => {
  const { name, email, gender, address, phone } = req.body;
  if (!name || !email || !gender || !address || !phone) {
    return res.status(404).json({ message: "Fill in all the fields" });
  }

  let lastItem = data[data.length - 1];
  let newId = lastItem.id + 1;

  let newItem;
  newItem = { id: newId, name, email, gender, address, phone };

  data.push(newItem);
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.status(200).json(newItem);
});

app.patch("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  const { name, email, gender, address, phone } = req.body;
  const updatedItem = {
    ...data[itemIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(gender && { gender }),
    ...(address && { address }),
    ...(phone && { phone }),
  };
  data[itemIndex] = updatedItem;
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.status(200).json(updatedItem);
});

app.delete("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).send("Item not found");
  }
  data.splice(itemIndex, 1);
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.send("Item deleted");
});

app.listen(port, () => {
  console.log(`App running on PORT: ${port}`);
});
