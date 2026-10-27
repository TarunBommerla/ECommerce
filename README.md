# AXION --- MERN E-Commerce Platform

AXION is a full-stack e-commerce web application built with the **MERN
stack**. It provides a shopping experience for customers and
administrative tools to manage products, users, orders, and reviews.

## Features

### Customer Features

-   Browse the product catalogue and view product details.
-   View product images and product information.
-   Add products to the shopping cart and manage cart items.
-   Register and log in to an account.
-   Place orders and view order-related information.
-   Submit and view product reviews.
-   Navigate through a responsive interface built with React and
    Tailwind CSS.

### Admin Features

-   Create, view, update, and manage products.
-   Upload and manage product images using Cloudinary.
-   View and manage registered users.
-   View orders and update order statuses.
-   View and manage product reviews.
-   Access administrative pages for store management.

> Features can vary depending on the current version of the application
> and the routes enabled in your deployment.

## Tech Stack

### Frontend

-   **React** --- component-based user interface
-   **Vite** --- frontend development and build tooling
-   **React Router DOM** --- client-side routing
-   **Redux Toolkit** and **React Redux** --- application state
    management
-   **Axios** --- HTTP requests to the backend API
-   **Tailwind CSS** --- responsive styling
-   **React Toastify** --- toast notifications
-   **Remix Icon** --- interface icons
-   **Country-State-City** --- country, state, and city data where
    needed

### Backend

-   **Node.js** --- JavaScript runtime
-   **Express.js** --- REST API and server
-   **MongoDB** --- database
-   **Mongoose** --- MongoDB object modelling
-   **JSON Web Token (JWT)** --- token-based authentication
-   **Cloudinary** --- product image storage and delivery
-   **Nodemailer** --- email functionality
-   **Validator** --- input validation
-   **Cookie Parser** --- parsing cookies
-   **dotenv** --- environment variable configuration
-   **express-fileupload** --- handling file uploads
-   **crypto** --- cryptographic utilities
-   **Nodemon** --- development server restart utility

## Application Architecture

AXION follows a client-server architecture:

1.  The **React frontend** renders pages and handles user interactions.
2.  **Redux Toolkit** manages shared frontend state and asynchronous
    actions.
3.  **Axios** sends requests from the frontend to the backend.
4.  The **Express API** processes requests and applies application
    logic.
5.  **Mongoose** communicates with the MongoDB database.
6.  **Cloudinary** stores and serves uploaded product images.

## Getting Started

### Prerequisites

Install the following before running the project:

-   Node.js and npm
-   A MongoDB database (local or hosted)
-   A Cloudinary account if you want to use image uploads

### 1. Clone the repository

``` bash
git clone https://github.com/TarunBommerla/ECommerce.git
cd ECommerce
```

### 2. Install backend dependencies

From the project root, install the backend dependencies:

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend's expected location and add the
variables used by your application. Common examples are:

``` env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use the **exact variable names expected by your code**. If your project
uses different names, update this example accordingly. Never commit real
secrets or credentials to GitHub.

### 4. Install frontend dependencies

``` bash
cd frontend
npm install
```

### 5. Run the application locally

Start the backend from the backend/project root in one terminal:

``` bash
npm run dev
```

Start the Vite frontend from the `frontend` directory in another
terminal:

``` bash
npm run dev
```

Vite commonly serves the frontend at `http://localhost:5173`. The
backend address and port depend on your environment configuration.
Ensure the frontend API base URL points to the running backend.

### 6. Build the frontend for production

From the `frontend` directory:

``` bash
npm run build
```

If your backend is configured to serve the production frontend, start
the backend using the start script defined in your `package.json`.

> **Note:** Check the scripts in both `package.json` files and the
> variable names in your source code. Adjust the commands and `.env`
> examples if your repository uses a different setup.

## Environment Variables and Security

-   Keep `.env` files out of version control.
-   Do not expose database credentials, JWT secrets, or Cloudinary API
    secrets in frontend code.
-   Configure production environment variables in your hosting provider.
-   Validate incoming data on the server and protect administrative
    endpoints.

## Project Structure

The exact structure may differ slightly, but the application is
organized around a frontend and backend:

``` text
ECommerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/        # Store and state-management logic (if organized this way)
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend source files/
├── package.json
└── README.md
```

## Deployment

The application has been configured for deployment with a Node/Express
backend and a built React frontend. For production deployment:

1.  Set the required environment variables on the hosting platform.
2.  Install dependencies for the frontend and backend.
3.  Build the frontend using `npm run build`.
4.  Ensure the backend serves the generated frontend build if using a
    single-server deployment.
5.  Confirm that API routes, static assets, database access, and image
    uploads work in the deployed environment.

## Future Improvements

-   Add automated tests for API endpoints and user flows.
-   Improve loading, empty, and error states across the interface.
-   Add pagination and advanced search/filtering as needed.
-   Improve accessibility and performance.
-   Add CI checks and deployment automation.

## Author

**Tarun Bommerla**

GitHub: [TarunBommerla](https://github.com/TarunBommerla)

------------------------------------------------------------------------

If you find this project useful, feel free to explore the repository and
share feedback.
