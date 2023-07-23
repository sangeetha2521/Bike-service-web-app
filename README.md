# Bike-service-web-app

This application is for owners of Bike service stations. It helps the owners to list all the services they offer. Customers can choose one or more services to book

BikeService Application:

Welcome to the BikeService application! This application provides a platform for managing bike services and related activities.

Running the Application:

To run the application, follow these steps:

Make sure you have Node.js and npm installed on your machine.

Clone this repository to your local machine.

Open a terminal (command prompt) and navigate to the root directory of the project.

Install the dependencies for both the frontend and backend:

npm install
Start the backend server:
npm start
The backend server will start running on port 8000.

In a separate terminal window, start the frontend:
cd frontend
npm start
The frontend will be accessible on port 3000.

Environment Variables
The application uses environment variables to configure certain settings. Make sure to set the following environment variables:

REACT_APP_BE_URL: The backend API URL for the frontend to communicate with. Set it to http://localhost:8000/api/v1.

DB_URL: The MongoDB database URL for the backend to connect to the database.

SECRET_KEY: A secret key used for various security purposes in the application.

MAIL_USERNAME: The email address used to send emails from the application.

MAIL_PASSWORD: The password for the email account used to send emails.

Make sure to set these environment variables either as system environment variables or use a .env file in the root directory of the project.

Example Env variables

DB_URL="mongodb+srv://sangins8101:nsfamily25@bikeservice.ciancre.mongodb.net/bikeservice?retryWrites=true&w=majority"
SECRET_KEY="XXXXXXXX"
MAIL_USERNAME="devsangisuresh@gmail.com"
MAIL_PASSWORD="qikarfqubrgegvqu"

Sample Schema

For sample schema please refer db.json file
