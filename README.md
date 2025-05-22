# Fortech-Real-Time-Events-App
Fullstack application that demonstrates real-time communication between a backend (Node.js) and a frontend (React) with Material-UI interface.

## 🚀 Features

### Real-time Communication
- **Live Event Streaming**: Instant notification delivery via Socket.IO
- **Bi-directional Communication**: Send commands back to server
- **Connection Status**: Real-time connection monitoring
- **Auto-reconnection**: Seamless reconnection handling

### Notification System
- **5 Notification Types**: User signups, stock updates, sensor alerts, chat messages, system alerts
- **Smart Categorization**: Color-coded notifications with icons
- **Read/Unread Status**: Interactive mark-as-read functionality
- **Auto-generation**: Server generates random events every 5 seconds


### UI/UX
- **Material-UI Design**: Modern, responsive interface
- **CSS Modules**: Scoped styling with hover effects
- **Real-time Updates**: Smooth animations and transitions
- **Storage Dashboard**: Expandable storage info with analytics

## 🛠️ Tech Stack

### Frontend
- **React 18.2+** - Modern UI library
- **TypeScript** - Type safety and development experience
- **Vite** - Fast development and build tool
- **Material-UI (MUI)** - Professional component library
- **Redux Toolkit** - Predictable state management
- **Socket.IO Client** - Real-time communication
- **CSS Modules** - Scoped styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **TypeScript** - Type safety on server
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Yarn** - Package manager
- **ESLint** - Code linting
- **ts-node-dev** - TypeScript development server

## 📁 Project Structure

```
realtime-app/
├── README.md
├── .gitignore
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   └── src/
│       ├── server.ts          # Express + Socket.IO server
│       └── types.ts           # Shared type definitions
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html
    ├── .gitignore
    └── src/
        ├── main.tsx           # App entry point
        ├── App.tsx            # Main app component
        ├── App.css
        ├── index.css
        ├── types/
        │   └── index.ts       # Frontend type definitions
        ├── store/
        │   └── index.ts       # Redux store with localStorage
        ├── services/
        │   ├── socketService.ts    # Socket.IO client service
        │   └── storageService.ts   # localStorage management
        └── components/
            ├── NotificationCard/
            │   ├── NotificationCard.tsx
            │   └── NotificationCard.module.css
            ├── ConnectionStatus/
            │   ├── ConnectionStatus.tsx
            │   └── ConnectionStatus.module.css
            ├── NotificationList/
            │   ├── NotificationList.tsx
            │   └── NotificationList.module.css
            └── StorageInfo/
                ├── StorageInfo.tsx
                └── StorageInfo.module.css
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nirReich/Fortech-Real-Time-Events-App.git
   cd Fortech-Real-Time-Events-App
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   yarn
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   yarn
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   yarn dev
   ```
   Server runs on `http://localhost:3001`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   yarn dev
   ```
   Application runs on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 🔧 Available Scripts

### Backend
- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start` - Start production server

### Frontend
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy reviewing this app!