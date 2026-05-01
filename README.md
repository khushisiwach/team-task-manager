# Team Task Manager

A simple full-stack team task management app built for a fresher-friendly coding assignment.

## Features

- Signup and login with JWT authentication
- Project creation and member management
- Task creation, assignment, and status updates
- Role-based access for Admin and Member users
- Dashboard with total tasks, status counts, overdue tasks, and task distribution

## Tech Stack

- Frontend: React.js + Tailwind CSS + Vite
- Backend: Node.js + Express.js
- Database: MongoDB with Mongoose

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root using `.env.example`.

3. Add your MongoDB connection string and JWT secret.

4. Run the app in development mode:

   ```bash
   npm run dev
   ```

5. Open the app in your browser.

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

## Production Build

```bash
npm run build
npm start
```

The Express server serves the built React app from `frontend/dist` in production.

## Railway Deployment

1. Push the code to GitHub.
2. Create a new Railway project from the repository.
3. Add the environment variables in the Railway dashboard.
4. Set the start command to:

   ```bash
   npm start
   ```

5. Make sure MongoDB is available through MongoDB Atlas and the connection string is added to Railway.

## API Overview

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/projects`
- `POST /api/projects`
- `POST /api/projects/:projectId/members`
- `DELETE /api/projects/:projectId/members/:userId`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`
- `GET /api/dashboard`

## Notes

- The first project creator becomes Admin for that project.
- Members can update only the tasks assigned to them.
- Admin users can manage members and tasks inside their projects.