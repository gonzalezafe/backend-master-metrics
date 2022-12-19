import express from "express";
import cors from "cors";

import itemRouter from "./routes/item";

const app = express();

//middlewere cors

app.use(cors());

//middlewere que transforma la req.body a un json
app.use(express.json());

const PORT = 3001;

app.use("/api/items", itemRouter);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
