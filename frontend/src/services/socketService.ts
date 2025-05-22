import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { addNotification, setConnectionStatus } from '../store';
import { NotificationEvent } from '../types';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:3001');

    this.socket.on('connect', () => {
      console.log('Connected to server');
      store.dispatch(setConnectionStatus({ connected: true, timestamp: new Date() }));
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      store.dispatch(setConnectionStatus({ connected: false, timestamp: new Date() }));
    });

    this.socket.on('notification', (notification: NotificationEvent) => {
      store.dispatch(addNotification({
        ...notification,
        timestamp: new Date(notification.timestamp)
      }));
    });

    this.socket.on('connection_status', (status) => {
      store.dispatch(setConnectionStatus({
        connected: status.connected,
        timestamp: new Date(status.timestamp)
      }));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  markAsRead(id: string) {
    if (this.socket) {
      this.socket.emit('mark_read', id);
    }
  }

  sendCommand(type: string, payload: any) {
    if (this.socket) {
      this.socket.emit('command', { type, payload });
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();