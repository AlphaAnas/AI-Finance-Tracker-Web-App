# **Personal Expense Tracker App**

This repository contains the implementation of a **Personal Expense Tracker** application. It allows users to track their income and expenses, receive AI-powered budget recommendations, and generate visual summaries of their financial data. The project is built with **Next.js**, **Vercel**, and **Firebase**.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Datasets](#datasets)
- [Folder Structure](#folder-structure)
- [API Definitions](#api-definitions)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
The **Personal Expense Tracker** app enables users to:
- Log income and expenses.
- Categorize transactions.
- Attach receipts to expenses for better tracking.
- View daily, monthly, and yearly spending summaries with visual charts.
- Get AI-driven budget recommendations based on spending patterns.
  
The app aims to help users manage their finances, improve spending habits, and track progress toward financial goals.

---

## Features
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Expense Management**: Add, edit, and delete income and expenses. Attach receipts via URL.
- **Budgeting**: Set budgets for different categories and get notifications when budgets are exceeded.
- **AI-Powered Recommendations**: Personalized budget recommendations based on historical spending (using **Gemini 2.0**).
- **Reports & Data Visualization**: Daily, weekly, and monthly visual summaries of spending using charts.
- **Mobile-First Design**: Optimized for mobile use with responsive design.
- **Data Security**: Secure login and user data management using Firebase Authentication and JWT.

---

## Tech Stack
- **Frontend**: Next.js (React.js) with the **`app`** directory
- **Backend**: Next.js API Routes (Firebase Functions for serverless architecture)
- **Database**: Firebase Firestore (for real-time data storage)
- **Authentication**: Firebase Authentication (JWT tokens for secure login)
- **AI & ML**: Gemini 2.0 for receipt scanning and budget recommendations
- **Hosting**: Vercel (for frontend hosting) and Firebase (for backend functions)
- **CI/CD**: GitHub Actions for automated deployment

---

## Getting Started

### Prerequisites
To run this project locally, you'll need the following:
- Node.js (v16.x or higher)
- Firebase account (for Authentication and Firestore)
- Vercel account (optional, for deployment)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AlphaAnas/Algorithms-Project-Implementation.git
   cd personal-expense-tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project.
   - Set up Firebase Firestore and Firebase Authentication.
   - Get your Firebase config credentials and add them to `.env.local`.

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY 
FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
GOOGLE_CLOUD_PROJECT=YOUR_GOOGLE_CLOUD_PROJECT
FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

```


4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Datasets
This app does not use any external datasets. However, it does allow users to upload receipts, which are then processed using Gemini 2.0 for automatic data extraction like price and category.

---

## Folder Structure
The project follows a standard Next.js application structure with the app directory pattern:

```
personal-expense-tracker/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   └── ai/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── public/
├── firebase/
├── node_modules/
├── .env.local
├── package.json
├── README.md
└── next.config.js
```

---

## API Definitions

The app exposes the following API endpoints to manage user data, transactions, and receipts.

### **User Authentication**
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate an existing user.
- **PUT /api/auth/profile**: Update the authenticated user's profile.

### **Expense and Income Management**
- **POST /api/transactions/save**: Log a new income or expense.
- **GET /api/transactions/list**: Retrieve a list of transactions.
- **POST /api/transactions/receipt**: Upload and process receipt images.

### **Budget and Recommendations**
- **POST /api/budgets/save**: Save or update budget information.
- **GET /api/budgets/summary**: Get a summary of the user's budget and expenses.
- **GET /api/ai/budget-recommendations**: Get AI-driven budget recommendations.

---

## Contributing
The repository is under active development. Therfore, contributions from outside are not accepted at this time. However, if you would like to contribute in the future, please reach out to the team members.


## Team Members
- **Muhammad Anas** - Computer Science, Habib University - [Email](mailto:ma08458@st.habib.edu.pk) - [LinkedIn](https://www.linkedin.com/in/muhammad-anas-355ab5260/)
- **Moaz Siddqui** - Computer Science, Habib University - [Email](mailto:ms08084@st.habib.edu.pk)  

- **Muhammad Farzam** - Computer Science, Habib University - [Email](mailto:mg08228@st.habib.edu.pk) 
- **Zohaib Aslam** - Computer Science, Habib University - [Email](mailto:mz08230@st.habib.edu.pk) - [LinkedIn](https://www.linkedin.com/in/zohaib-aslam-1829752ab/)
- **Taha Munawar** - Computer Science, Habib University - [Email](mailto:tm08122@st.habib.edu.pkk) - [LinkedIn](https://www.linkedin.com/in/taha-munawar-1b5480220/)

- Supervisor: Prof. Muhammad Yousuf Bin Azhar 
---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

