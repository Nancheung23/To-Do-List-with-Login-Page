# To-Do List Application

## Introduction
Welcome to the To-Do List application - a single-page web application (SPA) that helps you manage your daily tasks with ease. This full-stack project features a user-friendly interface for creating, managing, and visualizing tasks based on their importance level.

## Features
- **User Authentication**: Secure login, registration, and password change functionality.
- **Task Management**: Add, remove, and modify tasks with real-time updates. (with animation, date formatting)
- **Dynamic Content**: Utilize AJAX calls for a seamless user experience without page reloads.
- **Responsive Design**: Compatible with various devices and screen sizes. (max-width: 500px / 1070px)
- **Color-Coded Importance**: Easily identify tasks by their level of importance. (eg. Very Important : red)
- **Modern JavaScript**: Asynchronous JavaScript (async/await) for efficient server communication.
- **Express Backend**: A robust Node.js/Express server that handles API requests and serves user data. (provide multi-functional interfaces)

## Technologies
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database Simulation**: In-memory JavaScript object (with different userId and dataId)
- **Third-Party Libraries**: Body-parser, Cors, Moment.js for date formatting

## Project Structure
```
frontend/
│   createUser.html
│   createUser.js
│   login.html
│   login.js
│   changePassword.html
│   changePassword.js
│   index.html
│   index.js
│   index.css
│   login.css
└───assets/
backend/
│   server.js
```

## Getting Started
To get started with this project, clone the repository and install the dependencies:
```bash
git clone git@github.com:Nancheung23/To-Do-List-with-Login-Page.git
cd backend
npm install express body-parser cors moment
```

### Running the Server
To launch the Express server, run the following command in the `backend` directory:
```bash
npm run dev
```

### Accessing the Application
Open your web browser and navigate to `http://localhost:5000` to view the application.

## Contributions
Contributions are welcome. If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.
