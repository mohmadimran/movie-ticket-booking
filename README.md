# 🎬 CINEMAHUB - Movie Ticket Booking Application

A full-featured movie ticket booking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can browse shows, book tickets, manage bookings, and administrators can manage shows and bookings with ease.

## ✨ Features

### 👤 User Features
- **User Authentication**: Register, login, and logout functionality
- **Browse Shows**: View all available movie shows with details
- **Book Tickets**: Select shows and choose number of seats
- **My Bookings**: View, update, and cancel bookings
- **Booking Status**: Track booking status (Pending, Confirmed, Cancelled, Failed)
- **Responsive Design**: Fully responsive across all devices

### 👑 Admin Features
- **Dashboard**: Overview with key statistics
- **Manage Shows**: Create, update, and delete movie shows
- **Manage Bookings**: View all bookings, confirm or reject pending bookings
- **Search & Filter**: Search shows by name and sort by various criteria
- **Pagination**: Efficient data display with pagination

### 🎨 UI/UX Features
- **Cinema Theme**: Dark theme with gold accents for a premium cinema feel
- **Glassmorphism**: Modern glass effects on cards and forms
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Optimized for all screen sizes
- **Loading States**: Professional loading indicators
- **Toast Notifications**: User-friendly feedback messages

## 🚀 Tech Stack

### Frontend
- **React 18** with Hooks
- **React Router DOM** for navigation
- **Axios** for API calls
- **CSS Modules** for component styling
- **React Icons** for beautiful icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing

### Development Tools
- **Create React App**
- **ESLint** for code linting
- **Prettier** for code formatting
- **Nodemon** for development

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cinemahub.git
cd cinemahub/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cinemahub/
├── frontend/
│   ├── src/
│   │   ├── api/              # API service calls
│   │   ├── auth/             # Authentication context
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Shows/
│   │   │   ├── Booking/
│   │   │   ├── MyBookings/
│   │   │   └── AdminDashboard/
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   └── package.json
├── backend/
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration files
│   ├── server.js             # Server entry point
│   └── package.json
└── README.md
```

## 🎯 Key Features Explained

### Authentication Flow
- JWT-based authentication
- Protected routes
- Role-based access (User/Admin)
- Persistent login sessions

### Booking Process
1. User browses available shows
2. Selects a show and number of seats
3. Booking is created with "PENDING" status
4. Admin can confirm or reject the booking
5. User receives confirmation or rejection notification

### Admin Dashboard
- **Statistics Cards**: Total shows, seats, bookings
- **Show Management**: Create, edit, delete shows
- **Booking Management**: View and manage all bookings
- **Search & Sort**: Find and organize shows efficiently

## 🎨 UI Components

### Custom Components
- `Pagination`: Reusable pagination component
- `DashboardCards`: Statistics display cards
- `SearchAndSort`: Search and filter functionality
- `Navbar`: Dynamic navigation with auth state

### Styling System
- CSS Modules for component-scoped styles
- Global cinema theme with gold accents
- Glassmorphism effects
- Responsive design patterns
- Custom animations and transitions

## 🔒 Environment Variables

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/cinemahub` |
| `JWT_SECRET` | JWT secret key | `your-secret-key` |

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🚀 Deployment

### Backend Deployment (Render)
```bash
# Create a Procfile
web: node server.js

# Deploy
git push render main
```

### Frontend Deployment (Vercel)
```bash
# Build
npm run build

# Deploy
vercel --prod
```

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Shows
- `GET /api/shows` - Get all shows
- `GET /api/shows/:id` - Get single show
- `POST /api/shows` - Create show (Admin)
- `PUT /api/shows/:id` - Update show (Admin)
- `DELETE /api/shows/:id` - Delete show (Admin)

### Bookings
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings` - Get all bookings (Admin)
- `POST /api/bookings/admin/create/:showId` - Create booking
- `PUT /api/bookings/user/update/:id` - Update booking
- `PUT /api/bookings/admin/confirm/:id/confirm` - Confirm booking (Admin)
- `PUT /api/bookings/admin/reject/:id/reject` - Reject booking (Admin)
- `DELETE /api/bookings/admin/cancel/:id` - Cancel booking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint rules
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🙏 Acknowledgments

- React and Node.js communities
- MongoDB for database
- All open-source libraries used

## 📞 Contact

- **Project Link**: [https://github.com/yourusername/cinemahub](https://github.com/yourusername/cinemahub)
- **Live Demo**: [https://cinemahub.com](https://cinemahub.com)


---

**Made with ❤️ by [imrankhan]**
