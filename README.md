# AXION — MERN E-Commerce Platform

AXION is a full-stack e-commerce web application built using the **MERN stack**. It provides an online shopping experience for customers and administrative tools to manage products, users, orders, and reviews.

## 🌐 Live Demo

**Deployment Platform:** Render

**Live Website:** [Visit AXION](https://axion-m7rq.onrender.com/)

> Replace the placeholder above with your actual deployed Render URL.

## ✨ Features

### 🛍️ Customer Features
- Browse products and view detailed product information.
- View product images and product details.
- Add products to the shopping cart and manage cart items.
- Register and log in to an account.
- Place orders and view order-related information.
- Submit and view product reviews.
- Navigate through a responsive user interface.

### 🔐 Admin Features
- Add, view, update, and manage products.
- Upload and manage product images using Cloudinary.
- View and manage registered users.
- View customer orders and update order statuses.
- View and manage product reviews.
- Access administrative pages for store management.

## 🛠️ Tech Stack

### Frontend
- **React.js** — Building the user interface.
- **Vite** — Frontend development and build tool.
- **React Router DOM** — Client-side routing.
- **Redux Toolkit** — State management.
- **React Redux** — Connecting React components to Redux.
- **Axios** — Making HTTP requests to the backend.
- **Tailwind CSS** — Responsive styling.
- **React Toastify** — Displaying notifications.
- **Remix Icon** — UI icons.
- **Country-State-City** — Country, state, and city data where needed.

### Backend
- **Node.js** — JavaScript runtime.
- **Express.js** — Backend server and REST API.
- **MongoDB** — NoSQL database.
- **Mongoose** — MongoDB object modelling.
- **JSON Web Token (JWT)** — Token-based authentication.
- **Cloudinary** — Product image storage and delivery.
- **Nodemailer** — Email functionality.
- **Validator** — Input validation.
- **Cookie Parser** — Parsing cookies.
- **dotenv** — Managing environment variables.
- **express-fileupload** — Handling file uploads.
- **crypto** — Cryptographic utilities.
- **Nodemon** — Automatically restarting the server during development.

## 🏗️ Application Architecture

AXION follows a client-server architecture:

1. **Frontend:** React renders the user interface and handles user interactions.
2. **State Management:** Redux Toolkit manages shared application state and asynchronous actions.
3. **API Communication:** Axios sends requests from the frontend to the backend.
4. **Backend:** Express.js processes requests and implements application logic.
5. **Database:** Mongoose communicates with MongoDB to store and retrieve application data.
6. **Image Management:** Cloudinary stores and serves uploaded product images.
7. **Deployment:** Render hosts the deployed application.

## 🚀 Getting Started

### Prerequisites

Install the following tools before running the project locally:

- Node.js
- npm
- MongoDB database
- Cloudinary account for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/TarunBommerla/ECommerce.git
cd ECommerce
```

### 2. Install Backend Dependencies

From the project root, run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the location expected by your backend and configure the environment variables required by your application.

Example:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** These variable names are examples. Use the exact names expected by your source code. Never upload real credentials or your `.env` file to GitHub.

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Run the Application Locally

Start the backend from the project root in one terminal:

```bash
npm run dev
```

Start the frontend from the `frontend` directory in another terminal:

```bash
npm run dev
```

Vite commonly serves the frontend at:

```text
http://localhost:5173
```

Make sure your frontend API configuration points to the correct backend URL.

> Check the scripts in your root and frontend `package.json` files to confirm the correct commands for your repository.

### 6. Build the Frontend

From the `frontend` directory, run:

```bash
npm run build
```

This generates the production build. If your Express backend serves the frontend build, ensure the backend is configured to serve the generated files correctly.

## ☁️ Deployment on Render

AXION is deployed on **Render**.

The deployment uses the project's configured build and start commands to run the application in production.

Deployment considerations:

1. Configure the required environment variables in the Render dashboard.
2. Set the correct build and start commands for the repository.
3. Build the frontend when required by the deployment configuration.
4. Ensure the backend connects to the MongoDB database.
5. Verify that product images load correctly through Cloudinary.
6. Test the API endpoints, frontend routes, and static assets after deployment.

**Live Demo:** Add your actual Render deployment URL in the Live Demo section at the top of this README.

## 🔒 Security

- Keep database credentials and API secrets private.
- Store sensitive configuration in environment variables.
- Do not commit `.env` files to GitHub.
- Protect administrative routes and validate incoming data on the backend.
- Configure production secrets through Render's environment settings.

## 📁 Project Structure

The structure below is illustrative. Your actual folders and filenames may differ.

```text
ECommerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend source files/
├── package.json
└── README.md
```

## 🔮 Future Improvements

- Add automated tests for API endpoints and user flows.
- Improve loading, empty, and error states.
- Add pagination and advanced search/filtering.
- Improve accessibility and performance.
- Introduce continuous integration and deployment checks.

## 👨‍💻 Author

**Tarun Bommerla**

GitHub: [TarunBommerla](https://github.com/TarunBommerla)

---

If you find this project useful, feel free to explore the repository and share feedback.
