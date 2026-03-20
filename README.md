# Microjobs

A full-stack freelance job marketplace platform that connects clients with skilled freelancers for short-term projects.

## Features

- **User Authentication**: Secure login and signup with JWT authentication
- **Job Posting**: Clients can post new job listings with detailed descriptions
- **Job Browsing**: Freelancers can explore and filter available jobs
- **Applications**: Freelancers can apply for jobs they're interested in
- **Job Management**: Track posted jobs and manage applications
- **User Profiles**: Manage user information and profile details
- **Dashboard**: Personalized dashboards for both clients and freelancers
- **Protected Routes**: Secure routes with authentication middleware

## Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** 7.8.2 - Client-side routing
- **Axios** 1.13.5 - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** & **React Icons** - Icon libraries

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** 4.22.1 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 7.8.9 - MongoDB ODM
- **JWT (jsonwebtoken)** 9.0.3 - Token-based authentication
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.6 - Cross-origin resource sharing
- **Dotenv** 17.2.4 - Environment variables
- **Nodemon** 3.1.11 - Auto-restart on file changes (dev)

## Project Structure

```
Microjobs/
├── microjobs-frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── Footer.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobsList.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/            # React Context for state management
│   │   │   └── AuthContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExploreJobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── MyApplication.jsx
│   │   │   ├── AcceptedJobs.jsx
│   │   │   ├── MyOrder.jsx
│   │   │   ├── MyPostedJob.jsx
│   │   │   ├── Applicants.jsx
│   │   │   ├── ClientDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── routes/             # Route configuration
│   │   │   └── AppRoutes.jsx
│   │   ├── utils/              # Utility functions
│   │   │   ├── api.js
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx             # Root component
│   │   ├── main.jsx            # Entry point
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html              # HTML template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
└── microjobs-backend/
    ├── config/
    │   └── db.js               # MongoDB connection
    ├── controllers/            # Business logic
    │   ├── authController.js
    │   ├── jobController.js
    │   └── applicationController.js
    ├── middleware/
    │   └── authMiddleware.js   # JWT authentication
    ├── models/                 # Database schemas
    │   ├── User.js
    │   ├── Job.js
    │   └── Application.js
    ├── routes/                 # API endpoints
    │   ├── authRoutes.js
    │   ├── jobRoutes.js
    │   └── applicationRoutes.js
    ├── server.js               # Express app setup
    ├── package.json
    └── .env                    # Environment variables
```

## Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd microjobs-frontend/microjobs-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev    # Development with nodemon
# or
npm start      # Production mode
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd microjobs-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Running the Application

To run both servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd microjobs-frontend/microjobs-backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd microjobs-frontend
npm run dev
```

Then open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Reset password

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create new job (requires auth)
- `PUT /api/jobs/:id` - Update job (requires auth)
- `DELETE /api/jobs/:id` - Delete job (requires auth)

### Applications
- `GET /api/applications` - Get user applications (requires auth)
- `POST /api/applications` - Apply for a job (requires auth)
- `GET /api/applications/job/:jobId` - Get job applicants (requires auth)
- `PUT /api/applications/:id` - Update application status (requires auth)

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/microjobs
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/microjobs

PORT=5000
JWT_SECRET=your_secret_key_here
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## Features Overview

### For Freelancers
- Browse and search available jobs
- Apply for jobs matching your skills
- View application status
- Access accepted jobs
- Manage your profile

### For Clients
- Post new job listings
- View applicants for posted jobs
- Manage posted jobs
- Accept or reject applications
- Track orders and projects

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in local storage and sent with each API request via the Authorization header.

## Error Handling

The application includes error handling for:
- Network errors
- Authentication failures
- Database errors
- Validation errors

## Future Enhancements

- Payment integration
- Ratings and reviews system
- Messaging system between clients and freelancers
- Project timeline tracking
- Advanced job filtering and search
- User verification badges
- Dispute resolution system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@microjobs.com or open an issue in the repository.

---

**Happy freelancing! 🚀**
