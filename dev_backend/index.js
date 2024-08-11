const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT || 4000;

// Import and connect to the database
const dbConnect = require('./config/database');
dbConnect();

// Middleware to parse JSON
app.use(express.json());

// Import and use routes
const todoRoutes = require("./routes/todos");
app.use("/api/v1", todoRoutes);

// Define a home route
app.get("/", (req, res) => {
  res.send("This is home page! baby");
});

// Start the server
app.listen(port, () => {
  console.log(`App is running successfully on port ${port}`);
  // Avoid logging sensitive information like the database URL in production
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Database URL: ${process.env.DATABASE_URL}`);
  }
});
/*
1. Client Request
User Interaction: A user interacts with your application, which could be through a web front-end, Postman, or another API client.
API Request: The client sends an HTTP request to your server. For instance, a POST request might be sent to http://localhost:3000/api/v1/todos with a JSON payload containing todo items.
2. Express Middleware
Request Parsing: Express uses middleware to parse incoming requests. For instance, express.json() middleware parses JSON bodies of incoming requests.

js
Copy code
app.use(express.json()); // Middleware to parse JSON bodies
3. Routing
Router Handling: The request is directed to a specific route based on the URL and HTTP method. In this case, the request to /api/v1/todos would be handled by a route in routes/todos.js.

js
Copy code
const todoRoutes = require('./routes/todos');
app.use('/api/v1', todoRoutes);
4. Controller Logic
Controller Function: The route handler in routes/todos.js calls the corresponding controller function. For example, if a POST request is made, the controller function in controllers/todoController.js handles the request.

js
Copy code
router.post('/todos', todoController.createTodo);
Business Logic: Inside the controller, you might perform validation, transform data, and handle errors before passing the data to the model.

js
Copy code
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const response = await Todo.create({ title, description });
        res.status(200).json({ success: true, data: response, message: 'Entry Created Successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
5. Mongoose Model
Model Interaction: The controller calls Mongoose methods to interact with MongoDB. For instance, Todo.create() inserts a new document into the todos collection.

js
Copy code
const Todo = require('../models/Todo'); // Mongoose model
Schema Definition: Mongoose uses the schema defined in models/Todo.js to ensure the data conforms to the expected structure.

js
Copy code
const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 50 },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now }
});
6. MongoDB
Database Operation: Mongoose sends the data to MongoDB, where it is saved in the database. MongoDB stores the data in collections and documents.
7. Response to Client
Sending Response: After the database operation is complete, the controller sends a response back to the client. This response might include success status, created data, or error messages.

js
Copy code
res.status(200).json({ success: true, data: response, message: 'Entry Created Successfully' });
8. Client Receives Response
Display or Process: The client receives the HTTP response and processes or displays the data as needed.
Summary
Here’s a step-by-step summary of the data flow:

Client sends a request.
Express Middleware parses the request.
Routing directs the request to the correct route.
Controller processes the request and interacts with the model.
Mongoose Model interacts with MongoDB.
MongoDB stores or retrieves data.
Controller sends a response back to the client.
Client processes or displays the response.
*/
