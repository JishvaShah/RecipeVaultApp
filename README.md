# Recipe Vault Project

Welcome to the Recipe Vault, where you can create, save, and manage your favorite recipes! This web application is built using Express.js for the backend, MongoDB as the database, and React + Vite for the frontend. With Recipe Vault, you can register, log in securely using JSON Web Tokens (JWT), and enjoy the following features:

## Features

- **User Registration and Authentication:** Users can register with a unique username and securely log in using JWT for authentication. Passwords are securely hashed using bcrypt for added security.

- **Recipe Management:** Users can create, edit, and delete their recipes, providing details such as title, ingredients, instructions, and category.

- **Recipe Storage:** All your saved recipes are stored in the Recipe Vault, and you can easily access them.

- **Search and Filter:** You can search for recipes by category and title, making it easy to find your favorite recipes.

- **Favorite Recipes:** Mark your favorite recipes and filter your collection to quickly access them.

## Final Project Enhancements (Commit# 34dcc4f5de10fb8e675cd6036ad65fb73caea7cf)

During the development of Recipe Vault, we conducted several usability studies to gather feedback on the application's functionality and user experience. These studies involved participants performing specific tasks while we observed their interactions with the app, and collecting their feedback through surveys and interviews.

Based on these insights, we made targeted enhancements to improve the Recipe Vault's usability and accessibility.

- **Ingredient List Management:** We've included delete buttons for individual ingredients in the create recipe form for better user control.
- **UI Feedback Improvements:** Replaced the traditional alert with a more subtle message toast when users create a new recipe.
- **Like Button Placement:** Moved the like button to the top-left of the recipe card to make it more accessible.
- **Delete Button Iconography:** Changed the cross icon to a more universally recognizable delete button for recipe deletion.
- **Category Display:** Added the category of each recipe on its card to provide more information at a glance.
- **Accessibility Commitment:** We've guaranteed full accessibility for screen readers and comprehensive keyboard navigation, achieving a 100% Lighthouse accessibility score.
- **Navigation Bar Redesign:** Simplified the Nav-Bar by placing the main logo on the left and all other page links on the right for better usability.
- **Form Usability:** Implemented placeholders in the create recipe form to provide visual cues for users, enhancing the overall usability of the form.
- **Form Validation:** Added validation checks to ensure all form information is correct before submission.
- **Design Update:** A complete typography and color palette update to match our brand's theme, providing a consistent and visually appealing user experience.
- **Typography Used:** Montserrat, Agbalumo, serif
- **Color Palette Used:** #f34242, #ffebcc, #5a6268, white(#fff), black(#000)
- **Security and Performance:** Introduced authentication with Passport for security

## Authors

This Recipe Vault App was created by the following individuals:

- Gaurang Jotwani (https://www.gaurang-portfolio.com)
- Jishva Shah (https://jishvashah.github.io/Personal-Homepage/)

## Screenshots:

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/75450361-b412-4594-9fe0-bf517c8fa6ed)

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/7c24adca-80a9-45ea-a7c5-5b54f82e25da)

![project3-thumbnail](https://github.com/JishvaShah/RecipeVaultApp/assets/77269630/17eb8fab-820c-4e53-8e77-cd728ba221a7)


## Accessiblity Report - Lighthouse Screenshots:

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/9c1a190a-2fbc-4475-a76c-e9eaf74cb380)

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/4615c6ba-b951-4487-8120-cbd42d81ec1b)

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/88d9d69f-f361-49ac-bd48-ee686e8f2757)

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/cd9cf43b-cf74-411b-a49d-b5c1a9d00f36)

![image](https://github.com/JishvaShah/RecipeVaultApp/assets/48160866/5246f23a-cb1f-4124-8e15-fffadb4fe9fa)

## Thumbnail link:

https://github.com/JishvaShah/RecipeVaultApp/assets/77269630/17eb8fab-820c-4e53-8e77-cd728ba221a7

## Slides link:

https://docs.google.com/presentation/d/1h7ULgcu_CKWZSXtSIcu_Cn9Ht23a9X6YeT3LJNcIUZw/edit?usp=sharing

## Deployed Website Link:

https://recipevault.onrender.com/

## Public Video Demnstration Link - P3:

https://youtu.be/-kkwOGH1mV0

## Public Video Demnstration Link - Final Project:

[TODO]

## Usability Study Report - Final Project:

https://docs.google.com/document/d/1zwflIHQuoCJwn6AQzExy0hyNbuOJm2h5fkUJ4c-d11s/edit?usp=sharing

## Mockups:

https://www.figma.com/file/jrteTptsGmrBh8zW7e5u8n/NEU-Web-Development-Project-3?type=design&node-id=0-1&mode=design

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
