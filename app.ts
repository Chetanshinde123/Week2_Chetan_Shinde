import express from "express";
import {
  filterPassedStudents,
  getAverageAge,
  getStudentNames,
  sortStudentsByGrade,
  students,
} from "./arrayExercises";
import { checkAndCreateTable, createOrder, getOrders } from "./service";

const app = express();
app.use(express.json());

// Ensure table exists
checkAndCreateTable();

// POST API to process and store orders
app.post("/orders", async (req, res) => {
  const items = req.body.items || (req.body.data && req.body.data.items);

  if (!items || !Array.isArray(items)) {
    return res.status(400).send("Invalid payload");
  }

  // Filter orders where any OrderBlock's lineNo is divisible by 3
  // Filter orders where any OrderBlock's lineNo array contains a number divisible by 3
  const filteredOrders = items.filter((item) =>
    item.OrderBlocks.some((block: { lineNo: number | any[] }) =>
      Array.isArray(block.lineNo)
        ? block.lineNo.some((line: number) => line % 3 === 0)
        : block.lineNo % 3 === 0
    )
  );

  try {
    // Store orderIDs in PostgreSQL database
    for (const order of filteredOrders) {
      await createOrder(order.orderID);
    }
    res.send("Orders processed and stored successfully");
  } catch (err) {
    res.status(500).send("Error processing orders");
  }
});

app.get("/orders", async (req, res) => {
  const orders = await getOrders();
  res.json(orders);
  console.log(orders);
});

// Array Exercises Route
app.get("/students/passed", (req, res) => {
  res.json(filterPassedStudents(students));
  console.log(filterPassedStudents(students));
});

app.get("/students/names", (req, res) => {
  res.json(getStudentNames(students));
  console.log(getStudentNames(students));
});

app.get("/students/sorted", (req, res) => {
  res.json(sortStudentsByGrade(students));
  console.log(sortStudentsByGrade(students));
});

app.get("/students/average-age", (req, res) => {
  res.json(getAverageAge(students));
  console.log(getAverageAge(students));
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
