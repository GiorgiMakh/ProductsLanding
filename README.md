# MERN Product Landing Page

This is a simple product landing page application built using the MERN stack, allowing users to perform CRUD operations and manage product information.

## Features

- Display products with details such as name, price, and description.
- Add new products with images, price, and description.
- Edit existing product information.
- Remove products from the list.
- Remove all products.

## Technologies Used

Before running the server, take a look:

- MongoDB (https://www.mongodb.com)
- Express.js (https://expressjs.com)
- React.js (https://react.dev)
- Node.js (https://nodejs.org)

## Setup Instructions

1. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/GiorgiMakh/ProductsLanding.git
   ```

2. Install dependencies using `npm install` in the root directory and the `frontend` directory:

   - Windows:
   ```bash
   cd ProductsLanding
   start cmd.exe /K "cd frontend && npm install"
   npm install
   ```

3. Set up configuration:

   - Configure the MongoDB connection URL in the `.env` file. Replace `Your_MONGODB_URI` with your actual MongoDB connection URL.

4. Run the project:

   - Backend:
     ```bash
     npm start
     ```
     The backend will start running on `http://localhost:3001`

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
     The frontend will start running on `http://localhost:3000`

## API Endpoints

- `GET /api/products` - Get all products.
- `POST /api/products` - Add a new product.
- `DELETE /api/products` - Deletes all products.
- `GET /api/product/:id` - Get product by ID.
- `PUT /api/products/:id` - Update a product by ID.
- `DELETE /api/products/:id` - Delete a product by ID.

## Frontend Routes

- `PATH /` - Index page displays all products.
- `PATH /add` - Add products page.
- `PATH /product/:id` - Get product by ID.
- `PATH /edit/:id` - Edit product by ID.

## Contributing

Contributions are welcome! Please feel free to open a pull request.

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License.
