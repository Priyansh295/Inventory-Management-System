import express, { Express } from "express";
import cors from "cors";
import routes from "./routes"; // Ensure this is exporting correctly in TypeScript
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

const app: Express = express(); // Type the application as Express
const port: number = 8800; // Define the port as a number

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json()); // Express has built-in body parser for json
app.use(bodyParser.json()); // Use body-parser's json if specific features needed

// Routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
    console.log(`Server up and running @ ${port}`);
    console.log(`URL: http://localhost:${port}/`);
});
