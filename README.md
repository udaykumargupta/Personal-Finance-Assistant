# Personal Finance Assistant 📊💸

![Java](https://img.shields.io/badge/Java-17-blue.svg) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg) ![React](https://img.shields.io/badge/React-18-blue.svg?logo=react) ![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg?logo=vite) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-darkblue.svg?logo=postgresql) ![JWT](https://img.shields.io/badge/JWT-Auth-orange.svg)

A full-stack application designed to provide users with a powerful and intuitive platform for tracking, managing, and analyzing their financial activities. This project showcases a robust, scalable backend built with Spring Boot following a clean architecture, and a modern, responsive frontend using React, Vite, and Shadcn/ui.

---

## ✨ Key Features

### Core Functionality
- ✅ **Secure User Authentication:** End-to-end security with JWT-based authentication, password encryption, and a complete forgot password flow using email OTP verification.
- ✅ **Two-Factor Authentication (2FA):** Enhanced security layer allowing users to enable 2FA via email.
- ✅ **Comprehensive Transaction Management:** Full CRUD (Create, Read, Update, Delete) operations for income and expense entries.

### Advanced Data Interaction
- ✅ **Paginated Transaction List:** Highly efficient, server-side paginated display of transaction history to handle large datasets smoothly.
- ✅ **Multi-Filter System:** Dynamically filter transactions by date range and/or by category name.

### Intelligent Data Import
- ✅ **AI Receipt Scanning:** Upload a receipt image (PNG, JPG) and have Google Vision AI automatically perform OCR to extract the vendor, total amount, and create a transaction.
- ✅ **PDF Statement Import:** Upload a PDF bank statement in a tabular format to bulk-import an entire transaction history.

### Rich Data Visualization
- ✅ **Interactive Analytics Dashboard:** A comprehensive dashboard featuring **six distinct, interactive charts** to visualize financial data from every angle.
- ✅ **Dynamic Chart Filtering:** Filter category-based analytics by a custom date range to drill down into specific periods.
- ✅ **Available Charts:**
    - Combined Daily Income vs. Expense
    - Combined Income vs. Expense by Category 
    - Expenses by Category 
    - Income by Category 
    - Expenses Over Time 
    - Income Over Time 

---

## 🏛️ Project Architecture

This project follows a professional, multi-layered architecture to ensure separation of concerns, maintainability, and scalability.

**Backend: MVC + Service + Repository Pattern**

-   **Controller Layer:** Handles all incoming HTTP requests, performs validation, and delegates business logic to the service layer.
-   **Service Layer:** Contains the core business logic of the application. It acts as an intermediary between the controllers and repositories.
-   **Repository Layer:** Manages all data access and persistence using Spring Data JPA, abstracting away the database interactions.

This clean architecture makes the application robust, easy to test, and simple to extend with new features.

---

## 🛠️ Tech Stack

| Backend (Java / Spring Boot) | Frontend (React / Vite) |
| ---------------------------- | ----------------------- |
| Java 17                      | React 18                |
| Spring Boot 3.x              | Vite                    |
| Spring Security              | Redux Toolkit (State Mgmt)|
| Spring Data JPA (Hibernate)  | Shadcn/ui & Radix UI    |
| PostgreSQL Database          | Tailwind CSS            |
| Maven (Dependency Mgmt)      | ApexCharts (Graphs)     |
| Lombok                       | Axios (API Calls)       |
| JWT for Authentication       | React Router            |
| **Google Cloud Vision API** |                         |
| **Apache PDFBox** |                         |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- JDK 17 or later
- Maven
- Node.js and npm
- PostgreSQL (or another configured database)

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/personal-finance-assistant.git](https://github.com/your-username/personal-finance-assistant.git)
    cd personal-finance-assistant/backend
    ```

2.  **Configure Database:**
    - Open `src/main/resources/application.properties`.
    - Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your local database configuration.

3.  **Set Up Google Cloud Vision API:**
    - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
    - Enable the **Cloud Vision API**.
    - Create a **Service Account**, grant it the `Cloud Vision AI User` role, and download the JSON key file.
    - Create a `.env` file in the root of the backend project (`/backend/.env`).
    - Add the following line to your `.env` file, pointing to your downloaded key:
      ```dotenv
      GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/gcp-keyfile.json
      ```

4.  **Run the Backend Server:**
    ```sh
    mvn spring-boot:run
    ```
    The backend will be running on `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../frontend
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Run the Frontend Development Server:**
    ```sh
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173` (or another port specified by Vite).

---

## 📝 API Endpoints

All endpoints are prefixed accordingly (e.g., `/auth`, `/api`). Protected endpoints require a `Bearer <JWT_TOKEN>` in the Authorization header.

| Method | Endpoint                             | Description                                            | Protected |
| ------ | ------------------------------------ | ------------------------------------------------------ | :-------: |
| `POST` | `/auth/signup`                       | Register a new user.                                   |    No     |
| `POST` | `/auth/signin`                       | Log in and receive a JWT token.                        |    No     |
| `POST` | `/auth/two-factor/otp/{otp}`         | Verify 2FA OTP during sign-in.                         |    No     |
| `POST` | `/auth/password/send-otp`            | Send a password reset OTP to the user's email.         |    No     |
| `POST` | `/auth/password/reset`               | Reset the password using a valid OTP.                  |    No     |
| `GET`  | `/api/users/profile`                 | Get the profile of the authenticated user.             |    Yes    |
| `POST` | `/api/users/verification/{type}/send-otp` | Send an OTP for enabling 2FA.                      |    Yes    |
| `PATCH`| `/api/users/enable-two-factor/verify-otp/{otp}` | Verify OTP to enable 2FA for the user.       |    Yes    |
| `POST` | `/api/transactions`                  | Create a new transaction.                              |    Yes    |
| `GET`  | `/api/transactions`                  | Get a paginated and filtered list of transactions.     |    Yes    |
| `POST` | `/api/transactions/upload-receipt`   | Upload a receipt image for OCR processing.             |    Yes    |
| `POST` | `/api/transactions/upload-pdf`       | Upload a PDF statement for bulk import.                |    Yes    |
| `GET`  | `/api/analytics/expenses/by-category`| Get expense summary by category (with date filter).    |    Yes    |
| `GET`  | `/api/analytics/income/by-category`  | Get income summary by category (with date filter).     |    Yes    |
| `GET`  | `/api/analytics/expenses/by-date`    | Get expense summary by date.                           |    Yes    |
| `GET`  | `/api/analytics/income/by-date`      | Get income summary by date.                            |    Yes    |

---

## 🌟 Future Enhancements

- **Budgeting Module:** Allow users to set monthly budgets for different categories and track progress.
- **Recurring Transactions:** Set up automatic logging for recurring bills or income (e.g., rent, salary).
- **Investment Tracking:** Integrate with financial APIs (e.g., Plaid, IEX Cloud) to track stock and asset performance.
- **Advanced AI Categorization:** Use machine learning to automatically suggest categories for new transactions based on their description.

---

## 👤 Author

**Uday Kumar Gupta**
- **LinkedIn:** ([https://linkedin.com/in/your-linkedin](https://www.linkedin.com/in/uday-gupta1104/))

