import app from "./app.js";

const PORT = 5030;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
