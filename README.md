[Live URL](https://catmdb.netlify.app)

# Installation and Migration Guide for CATMDB (Crypto ATM Database)

## Prerequisites:
Before installing and migrating, ensure that you have the following prerequisites installed on your system:
- Node.js (version 18.17.0 or higher)
- npm (Node Package Manager) or Yarn

## Installation:

### 1. Clone the Repository:
```bash
git clone https://github.com/The-web-wolf/catmdb-pwa
cd catmdb-pwa
```

### 2. Install Dependencies:
```bash
npm install
```
or
```bash
yarn install
```

## Configuration:
Create an env file either .production or .development depending on the environment you're setting on, and reference the .env.example file in the root dir and setup the fileds as required.

## Development:
To start the development server and preview locally, run the following command:
```bash
gatsby develop
```
This command will start a local development server at `http://localhost:8000` by default. You can access the app in a web browser to preview the changes.

## Migration:

### a. Version Control:
If you're migrating the app to a new environment or repository, make sure to back up your project files and commit any changes to a new branch on github and make a PR if needed.

### b. Update Dependencies:
Ensure that all dependencies and plugins used in the project are compatible with the new environment. Update `package.json` and `package-lock.json` (or `yarn.lock`) files with any necessary changes.

### c. File Migration:
Copy and migrate all relevant project files, including source code, static assets, configuration files, and content files, to the new environment or repository.

### d. Test and Debug:
After migration, thoroughly test the app to ensure that it functions correctly in the new environment. Debug any issues or errors that arise during testing.

## Deployment:
Once the app is successfully migrated and tested, deploy it to your desired hosting platform or server. Use the appropriate deployment commands or scripts provided by your hosting provider or CI/CD pipeline.

## Post-Deployment Checks:
After deployment, perform post-deployment checks to verify that your Gatsby app is running smoothly in the production environment. Monitor performance, check for errors, and address any issues promptly.