
# Task 34 - Schema Reference

## Project Overview

Schema Reference is a full-stack web application demonstrating how to reference one Mongoose schema from another.

The application allows users to create users, publish posts linked to users, and view posts with populated author information.

## Technologies Used

- React.js
- Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Axios
- CSS

## Features

- Create users with name and email.
- Create posts with title and content.
- Link each post to a user using a Mongoose ObjectId reference.
- Retrieve all posts with author details using `populate()`.
- Display post titles, content, author names, and email addresses.
- Store data in MongoDB.

## Project Structure

```text
ankita_task-34/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | Retrieve all users |
| POST | `/posts` | Create a post linked to a user |
| GET | `/posts` | Retrieve posts with populated user details |

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

Replace the MongoDB URI placeholder with your actual connection string.

## Installation and Setup

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm install axios
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Database Schema Reference

The Post schema contains a `user` field that references the User model through a MongoDB ObjectId.

The application uses Mongoose `populate()` to retrieve the author's name and email along with each post.

## Testing

1. Start the backend and frontend.
2. Create a user with a name and email.
3. Create a post and select its author.
4. Verify that the post appears in the list with the correct author details.
5. Verify the stored documents in MongoDB Atlas.

## Security

- Keep the `.env` file private.
- Do not commit database credentials to GitHub.
- Configure environment variables on the deployment platform.
