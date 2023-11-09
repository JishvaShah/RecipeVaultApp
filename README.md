# Recipe Vault Project

Welcome to the Recipe Vault, where you can create, save, and manage your favorite recipes! This web application is built using Express.js for the backend, MongoDB as the database, and React + Vite for the frontend. With Recipe Vault, you can register, log in securely using JSON Web Tokens (JWT), and enjoy the following features:

## Authors

This Recipe Vault App was created by the following individuals:

- Gaurang Jotwani (https://www.gaurang-portfolio.com)
- Jishva Shah (https://jishvashah.github.io/Personal-Homepage/)

## Screenshots:

![image](https://github.com/GaurangJotwani/StoreLocator/assets/77269630/7d96000c-f766-4ece-b6a8-9e8b45f88d7c)

## Thumbnail link:

https://drive.google.com/file/d/1CbeecVrXwPvuNPcgCcBRUdWdWYI8R6u6/view?usp=sharing

## Slides link:

https://docs.google.com/presentation/d/1TLhR-NRIvbFutsjqHHJijq4pvHEE3MmNezBmUXGmAsw/edit?usp=sharing

## Deployed Website Link:

https://recipevault.onrender.com/

## Public Video Demnstration Link:

https://drive.google.com/file/d/1aN6UCNfpBZ_d1x0x_K0o53-pjqwKK73w/view?usp=drive_link

## Mockups:

https://www.figma.com/file/jrteTptsGmrBh8zW7e5u8n/NEU-Web-Development-Project-3?type=design&node-id=0-1&mode=design

## Features

- **User Registration and Authentication:** Users can register with a unique username and securely log in using JWT for authentication. Passwords are securely hashed using bcrypt for added security.

- **Recipe Management:** Users can create, edit, and delete their recipes, providing details such as title, ingredients, instructions, and category.

- **Recipe Storage:** All your saved recipes are stored in the Recipe Vault, and you can easily access them.

- **Search and Filter:** You can search for recipes by category and title, making it easy to find your favorite recipes.

- **Favorite Recipes:** Mark your favorite recipes and filter your collection to quickly access them.

## Getting Started

These instructions will help you set up the Recipe Vault on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JishvaShah/RecipeVaultApp.git
   ```

2. Install all the dependencies

   ```bash
   cd RecipeVaultApp
   npm install
   cd front
   npm install
   ```

3. Start mongodb server locally on another terminal

   ```bash
   mongod --dbpath ~/data/db
   ```

4. Create a .env file in the root directory to store your environment variables. Include your MongoDB connection string and a JWT secret:

   ```bash
   MONGO_URL=mongodb://127.0.0.1:27017
   JWT_SECRET=your_jwt_secret
   ```

5. Start backend server on a a new terminal in the root of the project and initialize the db with synthetic records

   ```bash
   npm run initDB
   npm start
   ```

6. Start front-end development server on a new terminal

   ```bash
   cd front
   npm run dev
   ```

### Usage

- Register for an account or log in if you already have one.
- Create new recipes by providing the title, ingredients, instructions, and category.
- View and manage your saved recipes in your Recipe Vault.
- Search for recipes by category or title.
- Mark your favorite recipes and filter your collection by favorites.

### Technologies Used

- **Backend**: Express.js
- **Frontend**: React + Vite
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) and Bcrypt for password hashing
- **Cookies**: React Cookies for maintaining user sessions
