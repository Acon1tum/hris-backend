# hris-backend

## Project Overview
The `hris-backend` project is a backend application built using Express, TypeScript, PostgreSQL, PgAdmin, and Prisma. It serves as a Human Resource Information System (HRIS) backend, providing APIs for managing employee data and other HR-related functionalities.

## Technologies Used
- **Express**: A web application framework for Node.js, used to build the API.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **PostgreSQL**: A powerful, open-source relational database system used for data storage.
- **PgAdmin**: A web-based database management tool for PostgreSQL.
- **Prisma**: An ORM (Object-Relational Mapping) tool that simplifies database interactions and migrations.

## Project Structure
```
hris-backend
├── prisma
│   ├── schema.prisma
│   └── migrations
├── src
│   ├── app.ts
│   ├── config
│   │   └── database.ts
│   ├── controllers
│   │   └── index.ts
│   ├── routes
│   │   └── index.ts
│   ├── services
│   │   └── index.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd hris-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Update the database connection details in `src/config/database.ts` to match your PostgreSQL setup.

4. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Application**
   ```bash
   npm run start
   ```

## Usage
- The API endpoints can be accessed at `http://localhost:3000/api`.
- Use tools like Postman or curl to interact with the API.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.