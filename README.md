# Pastebin Project

## Description
This project is a Pastebin-like application built with Node.js, Express, and MySQL. It includes features such as:
- Health check API
- MySQL database connection
- Dynamic content rendering
- Environment variable support

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd pastebin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Create a `.env` file in the root directory with the following content:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pastebin
   DB_PORT=3306
   PORT=3000
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Access the application at:
   ```
   http://localhost:3000
   ```

## Features
- **Health Check**: Verify the database connection at `/healthz`.
- **MySQL Integration**: Robust database for storing pastes.
- **Dynamic Content Rendering**: Render paste content dynamically using EJS or static HTML.
- **Environment Variable Support**: Securely manage sensitive data using `.env`.

## Development
- Use the following task to start the server in development mode:
  ```bash
  node src/app.js
  ```

## License
This project is licensed under the MIT License.