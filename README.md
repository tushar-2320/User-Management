# Customer Management System

This project is a **Customer Management System** that allows users to manage customer-related data such as first name, last name, email, phone number, company, and job title. It is built using **Node.js**, **Express**, and **MongoDB** for the backend, and **React** with **Material-UI** for the frontend.

---

## Table of Contents
1. [Frontend](#frontend)
2. [Backend](#backend)
3. [Database](#database)
4. [Challenges Faced](#challenges-faced)
5. [Running the Project](#running-the-project)

---

## Frontend

The frontend is built using **React** and **Material-UI** components for styling. It provides a user-friendly form for managing customer data, including:
- **First Name**
- **Last Name**
- **Email**
- **Phone Number**
- **Company**
- **Job Title**

### Features:
- Users can input customer data via a form.
- Form submission sends data to the backend via an HTTP POST request using **Axios**.
- **Validation** ensures all required fields are completed correctly before submission.
- Utilizes **Material-UI's** built-in validation for form fields (like email and phone number formats).

#### To run the frontend, use the following command:

`npm run dev`
## Backend

The backend of this project is built using **Node.js** and **Express**, which allows us to build a RESTful API to manage customer-related data. It is responsible for handling requests from the frontend, interacting with the database, and returning the appropriate responses.

### Features:
1. **Customer Data Management**:
   - The backend handles CRUD operations (Create, Read, Update, Delete) for managing customer data.
   - Customer data includes fields like **firstName**, **lastName**, **email**, **phoneNumber**, **company**, and **jobTitle**.

2. **API Endpoints**:
   - **POST** `/contacts`: This endpoint accepts customer data from the frontend and stores it in the MongoDB database.
   - **GET** `/contacts`: Fetches all customer data stored in the database.
   - **PUT** `/contacts/:id`: Updates the customer data for a given ID.
   - **DELETE** `/contacts/:id`: Deletes a specific customer entry by ID.

3. **Database Interaction**:
   - The backend interacts with a **MongoDB Atlas** cloud database using **Mongoose** for schema definition and data validation.
   - Mongoose models provide a simple interface for CRUD operations with MongoDB, ensuring data integrity and validation.

4. **Validation and Error Handling**:
   - The backend performs validation checks before saving or updating customer data to ensure required fields are present.
   - The backend catches errors (e.g., database connection issues, invalid data formats) and sends appropriate error messages to the frontend.

### Technologies Used:
- **Node.js**: A JavaScript runtime used for building the backend server.
- **Express**: A web framework for building RESTful APIs.
- **MongoDB**: A NoSQL database used for storing customer data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, which provides a schema-based solution to model data.
# Database Setup and Configuration

## Database Overview

This project uses a **MongoDB** database to store and manage data. MongoDB is a NoSQL database that provides high flexibility and scalability for handling unstructured data. The application connects to MongoDB Atlas, which is a fully-managed cloud database service for MongoDB.

## Setting Up the Database

Follow the steps below to set up and connect to the database:

### 1. Create a MongoDB Atlas Account

If you don’t have a MongoDB Atlas account, create one at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). MongoDB Atlas offers a free-tier cluster to get started.

### 2. Create a Cluster

Once logged into MongoDB Atlas:

- Navigate to the "Clusters" section and create a new cluster.
- Choose a cloud provider and region (for a free-tier cluster, select a free option).

### 3. Create a Database User

- Under "Database Access," create a new user with appropriate permissions (preferably with `Read and Write` access).
- Make sure to note down the username and password.

### 4. Configure IP Whitelist

- Under "Network Access," add your current IP address or set the access to "0.0.0.0/0" (not recommended for production environments, but useful during development).

### 5. Get the Connection String

- Go to your cluster and click the "Connect" button.
- Choose the "Connect your application" option, and copy the provided connection string.
- Replace `<password>` with your MongoDB user’s password and ensure the database name is correctly set in the connection string.

## Database Configuration

The application uses an environment variable to store the MongoDB connection URI for security reasons. You should have a `.env` file in the root of your project with the following variable:


MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority
# Challenges Faced

Throughout the development of this project, several challenges were encountered, ranging from technical difficulties with MongoDB integration to handling data inconsistencies. Below are some of the main challenges faced and how they were addressed:

## 1. **Database Connection Issues**
   - **Challenge**: Initially, connecting to MongoDB Atlas was difficult due to configuration issues with SSL/TLS, leading to errors like `MongoNetworkError: SSL routines:ssl3_read_bytes:tlsv1 alert internal error`.
   - **Solution**: The issue was resolved by ensuring that the MongoDB URI was correct and that network access rules were properly set up in MongoDB Atlas. I also ensured that the environment variables in `.env` were configured correctly, including the MongoDB URI and credentials.

## 2. **Duplicate Role Insertion**
   - **Challenge**: While inserting data into the `roles` collection, errors like `E11000 duplicate key error` occurred because MongoDB was trying to insert duplicate role records, even though the roles (e.g., "Admin", "Manager") already existed.
   - **Solution**: To solve this, I added logic to check whether a role already exists in the database before attempting to insert it. This prevented duplicate entries and ensured the application would run smoothly without causing database conflicts.

## 3. **Validation Errors on User Insertions**
   - **Challenge**: During the user data insertion process, errors such as `User validation failed: name: Path 'name' is required` were raised. This was due to missing or incorrectly formatted data for required fields in the `Customer` schema.
   - **Solution**: The error was resolved by ensuring that all required fields in the `Customer` schema were populated correctly in the `data.js` file. Specifically, the `firstName`, `lastName`, and `email` fields were validated and included in the user data objects.

## 4. **Schema Design and Role Reference**
   - **Challenge**: One issue that arose was correctly associating users with their roles using a reference to the `Role` collection. It was tricky to ensure that when inserting users, the correct `ObjectId` for each role was associated with the user.
   - **Solution**: I implemented logic to first insert roles into the `roles` collection and then map the `role` field of each user to the correct `ObjectId` based on the role name. This ensured that each user was assigned the appropriate role during the data insertion process.

## 5. **Environment Variable Configuration**
   - **Challenge**: Managing and securely storing sensitive information like the MongoDB URI, database credentials, and other environment-specific configurations was initially challenging.
   - **Solution**: I used the `dotenv` package to manage environment variables securely. By storing sensitive information in the `.env` file and ensuring that it was not exposed to version control (via `.gitignore`), I mitigated the risk of exposing sensitive data.

## 6. **Data Formatting and Consistency**
   - **Challenge**: The `data.js` file had to be formatted correctly, especially with fields like `firstName` and `lastName` being separated from the `name` field. The data needed to be consistent and meet the validation criteria of the `Customer` schema.
   - **Solution**: I manually split the `name` field into `firstName` and `lastName` in the data file, ensuring that each field met the required validation rules for MongoDB insertion.

## 8. **Testing and Debugging**
   - **Challenge**: Ensuring that the application worked as expected in different environments and on different machines was challenging, especially when dealing with database connections and dependencies.
   - **Solution**: I implemented logging throughout the application to trace and identify issues during database operations. I also made sure to test the application on both local and cloud environments to ensure consistency in performance.


## 9. **MongoDB Atlas Configuration**
   - **Challenge**: Configuring MongoDB Atlas correctly with the right access permissions and network rules for security and performance was initially confusing.
   - **Solution**: After reviewing MongoDB Atlas documentation, I set up proper network access control, created a dedicated database user with the right permissions, and ensured that IP whitelisting was configured to allow access from my development environment.

---

### Conclusion
These challenges were critical in improving the robustness of the application. By troubleshooting and iterating over each of these issues, the application became more stable, and its integration with MongoDB Atlas was successfully achieved.

# Running the Project

Follow these steps to set up and run the project locally:

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (LTS version recommended)
  - You can download it from [Node.js official website](https://nodejs.org/).
- **MongoDB** (for local development) or an active MongoDB Atlas account (for cloud-based database).
- **npm** (comes with Node.js)

## Steps to Run Locally

### 1. Clone the Repository

Start by cloning the repository to your local machine using the following command:


`git clone https://github.com/your-username/User-Management.git`<br>
`cd User-Management`<br>
`npm install`<br>
(From mongodb atlas get)MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority<br>
PORT=5000<br>
After installing all necessary libraries and framework.<br>
Run command.<br>
`npm run dev`




