# Mentorgain Program Engine

A full-stack mentorship platform built with NestJS, React, and PostgreSQL for configuring and managing mentorship programs with dynamic application forms.

## Features

- Google OAuth Authentication - Secure login with Google accounts
- Role-based Access Control - Admin/user permissions system
- Program Display - View available mentorship programs

## Tech Stack

### Backend
- Framework: [NestJS](https://nestjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/)
- ORM: [Prisma](https://www.prisma.io/)
- Authentication: Google OAuth 2.0
- JWT: Token-based authentication

### Frontend
- Framework: [React](https://reactjs.org/) with TypeScript
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcdn.com/)
- Routing: [React Router DOM](https://reactrouter.com/)
- OAuth: [@react-oauth/google](https://github.com/MomenSherif/react-oauth)

## Current Status

### Completed
- Basic authentication system
- Google OAuth integration
- User management with Prisma
- Basic UI components and layout
- Environment configuration

### In Progress
- Dynamic form engine
- Program configuration system
- Enrollment workflow
- Admin dashboard
- Advanced form validation
- Audit logging

## Project Structure

```
mentorgain-program-engine/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── prisma/         # Database schema
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── prisma/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Route components
│   │   ├── lib/            # Utilities
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mentorgain"
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Frontend (.env)
```env
VITE_GOOGLE_CLIENT_ID="your-google-client-id"
VITE_API_URL="http://localhost:3000"
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Bun (recommended) or npm

### Backend Setup
```bash
cd backend
bun install
npx prisma migrate dev
bun run start:dev
```

### Frontend Setup
```bash
cd frontend
bun install
bun run dev
```

## Database Schema

### User Table
- id - UUID primary key
- email - Unique email address
- name - User's display name
- googleId - Unique Google ID
- role - UserRole enum (USER, ADMIN, SUPER_ADMIN)
- createdAt - Timestamp

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

