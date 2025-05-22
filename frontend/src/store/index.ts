import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationEvent } from '../types';

interface NotificationState {
  notifications: NotificationEvent[];
  connectionStatus: {
    connected: boolean;
    timestamp: Date | null;
  };
}

const initialState: NotificationState = {
  notifications: [],
  connectionStatus: {
    connected: false,
    timestamp: null,
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationEvent>) => {
      state.notifications.unshift({ ...action.payload, read: false });
      if (state.notifications.length > 100) {
        state.notifications = state.notifications.slice(0, 100);
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    setConnectionStatus: (state, action: PayloadAction<{ connected: boolean; timestamp: Date }>) => {
      state.connectionStatus = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, markAsRead, setConnectionStatus, clearNotifications } = notificationSlice.actions;

export const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['notifications/addNotification', 'notifications/setConnectionStatus'],
        ignoredPaths: ['notifications.notifications', 'notifications.connectionStatus.timestamp'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;