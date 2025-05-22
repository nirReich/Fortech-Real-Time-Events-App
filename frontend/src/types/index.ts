export interface NotificationEvent {
  id: string;
  type: 'user_signup' | 'stock_update' | 'sensor_alert' | 'chat_message' | 'system_alert';
  title: string;
  message: string;
  timestamp: Date;
  data?: any;
  read?: boolean;
}

export interface AppState {
  notifications: NotificationEvent[];
  connectionStatus: {
    connected: boolean;
    timestamp: Date | null;
  };
}