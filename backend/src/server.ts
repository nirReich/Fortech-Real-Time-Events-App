import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { NotificationEvent, ServerToClientEvents, ClientToServerEvents } from './types';

const app = express();
const server = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const notifications: NotificationEvent[] = [];

const generateRandomNotification = (): NotificationEvent => {
  const types = ['user_signup', 'stock_update', 'sensor_alert', 'chat_message', 'system_alert'];
  const templates = {
    user_signup: { title: 'New User', message: 'User joined the platform' },
    stock_update: { title: 'Stock Alert', message: `AAPL price: $${(150 + Math.random() * 50).toFixed(2)}` },
    sensor_alert: { title: 'Sensor Alert', message: 'Temperature exceeded threshold' },
    chat_message: { title: 'New Message', message: `User says: "${['Hello!', 'How are you?', 'Great work!'][Math.floor(Math.random() * 3)]}"` },
    system_alert: { title: 'System Alert', message: 'CPU usage at 85%' }
  };

  const type = types[Math.floor(Math.random() * types.length)] as keyof typeof templates;
  const template = templates[type];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: type as any,
    title: template.title,
    message: template.message,
    timestamp: new Date(),
    data: type === 'stock_update' ? { price: (150 + Math.random() * 50).toFixed(2) } : undefined
  };
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('connection_status', { connected: true, timestamp: new Date() });

  socket.on('command', (event) => {
    console.log('Command received:', event);
  });

  socket.on('mark_read', (id) => {
    console.log('Marked as read:', id);
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      console.log(`Notification ${id} marked as read`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const emitRandomNotification = () => {
  const notification = generateRandomNotification();
  notifications.push(notification);
  
  if (notifications.length > 100) {
    notifications.splice(0, notifications.length - 100);
  }

  io.emit('notification', notification);
  console.log('Emitted notification:', notification.title);
};

setInterval(emitRandomNotification, Math.random() * 5000 + 5000);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});