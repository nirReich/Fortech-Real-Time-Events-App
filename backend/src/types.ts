export interface NotificationEvent {
  id: string;
  type: 'user_signup' | 'stock_update' | 'sensor_alert' | 'chat_message' | 'system_alert';
  title: string;
  message: string;
  timestamp: Date;
  data?: any;
}

export interface CommandEvent {
  type: string;
  payload: any;
}

export interface ServerToClientEvents {
  notification: (event: NotificationEvent) => void;
  connection_status: (status: { connected: boolean; timestamp: Date }) => void;
}

export interface ClientToServerEvents {
  command: (event: CommandEvent) => void;
  mark_read: (id: string) => void;
}