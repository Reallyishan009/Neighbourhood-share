# Neighborhood Resource Sharing App

A full-stack web application that allows neighbors to share and borrow items within their community. Built with React (frontend) and Node.js/Express (backend).

- Full project line: [https://neighbourhood-frontend-theta.vercel.app]

- Front-end (React + Vite)
[https://neighbourhood-frontend-theta.vercel.app]

- Back-end (Node/Express API)
[https://neighbourhood-backend-theta.vercel.app/api]


## Features

- **Browse Items**: View all available items in the neighborhood
- **Search & Filter**: Search by name/description and filter by category/availability
- **Add Items**: Share your items with the community
- **Request Borrowing**: Request to borrow items from neighbors
- **Item Details**: View detailed information about each item
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Radix UI Components
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- CORS enabled
- In-memory data storage (can be extended to use a database)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neighborhood-resource-sharing-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## API Endpoints

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Add new item
- `POST /api/items/:id/borrow` - Request to borrow item
- `POST /api/items/:id/return` - Return borrowed item

## Project Structure

```
neighborhood-resource-sharing-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API functions
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Main server file
│   └── package.json
└── README.md
```

## Development

### Adding New Features
1. Create new API endpoints in `server/server.js`
2. Add corresponding API functions in `client/src/api/items.js`
3. Update UI components as needed

### Styling
The app uses Tailwind CSS with custom components from Radix UI. All styling is done through Tailwind classes.

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real-time notifications
- [ ] Image upload functionality
- [ ] User profiles and ratings
- [ ] Chat/messaging system
- [ ] Location-based item discovery
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 