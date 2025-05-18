# Unite Backend

The backend of the Unite community chat application, developed using TypeScript and Node.js. This server handles user authentication, real-time messaging, and integrates with a PostgreSQL database to manage persistent data.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)

## Features

* User registration and authentication
* Real-time messaging between users
* Integration with PostgreSQL for data persistence
* RESTful API design
* Modular and scalable codebase([GitHub][1])

## Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js
* **Database:** PostgreSQL
* **Package Manager:** npm
* **Linting:** ESLint([LinkedIn][2], [InfoQ][3])

## Getting Started

### Prerequisites

* Node.js (v16 or above)
* npm (v6 or above)
* PostgreSQL([GitHub][4])

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Data-Men/Unite-backend.git
   cd Unite-backend
   ```



2. **Install dependencies:**

   ```bash
   npm install
   ```



3. **Configure environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/unite_db
   JWT_SECRET=your_jwt_secret
   ```



4. **Run database migrations:**

   Ensure your PostgreSQL server is running and the database specified in `DATABASE_URL` exists.

5. **Start the server:**

   ```bash
   npm run dev
   ```



The server should now be running at `http://localhost:3000`.

## Project Structure

```bash
Unite-backend/
├── dist/               # Compiled JavaScript files
├── src/                # Source TypeScript files
│   ├── controllers/    # Route controllers
│   ├── models/         # Database interactions
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── index.ts        # Entry point
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore rules
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

