### Realtime Polling System Backend

This repository contains the backend for the realtime polling system, developed in Node.js using Fastify, Postgres, Zod, Prisma, and TypeScript. This system is currently in production, providing real-time polling features.

### System Requirements

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional to simplify PostgreSQL setup)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/polling-realtime-backend.git
   cd polling-realtime-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Database Configuration:**
   - Create a database in PostgreSQL.
   - Copy the `.env.example` file to `.env` and configure the environment variables related to the database.

4. **Run Prisma Migrations:**
   ```bash
   npx prisma migrate dev
   ```

### Environment Configuration

Make sure to properly configure the environment variables in the `.env` file. This includes database details, ports, and any other environment-specific settings.

### Running

- **Development Mode:**
  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm run build
  npm start
  ```

### Technologies Used

- **Fastify:** Lightweight and efficient web framework.
- **Postgres:** Relational database for storing polling data.
- **Zod:** Schema validation library to ensure data integrity.
- **Prisma:** ORM for simplified interaction with the Postgres database.
- **TypeScript:** Adds static typing to JavaScript for improved code safety and maintainability.

### Contributions

Feel free to contribute to the development of this project. If you encounter issues or have suggestions, please open an issue.

### License

This project is licensed under the [MIT License](LICENSE).