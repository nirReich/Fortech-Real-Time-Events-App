import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import {
  PersonAdd,
  TrendingUp,
  Warning,
  Chat,
  Computer,
  CheckCircle
} from '@mui/icons-material';
import { NotificationEvent } from '../../types';
import { useDispatch } from 'react-redux';
import { markAsRead } from '../../store';
import { socketService } from '../../services/socketService';
import styles from './NotificationCard.module.css';

interface NotificationCardProps {
  notification: NotificationEvent;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const dispatch = useDispatch();

  const getIcon = () => {
    switch (notification.type) {
      case 'user_signup': return <PersonAdd color="primary" />;
      case 'stock_update': return <TrendingUp color="success" />;
      case 'sensor_alert': return <Warning color="warning" />;
      case 'chat_message': return <Chat color="info" />;
      case 'system_alert': return <Computer color="error" />;
      default: return <Computer />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'user_signup': return 'primary';
      case 'stock_update': return 'success';
      case 'sensor_alert': return 'warning';
      case 'chat_message': return 'info';
      case 'system_alert': return 'error';
      default: return 'default';
    }
  };

  const handleMarkAsRead = () => {
    dispatch(markAsRead(notification.id));
    socketService.markAsRead(notification.id);
  };

  return (
    <Card 
      className={`${styles.card} ${notification.read ? styles.read : styles.unread}`}
      elevation={notification.read ? 1 : 3}
    >
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2} flex={1}>
            {getIcon()}
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Typography variant="h6" component="div">
                  {notification.title}
                </Typography>
                <Chip 
                  label={notification.type.replace('_', ' ')} 
                  size="small" 
                  color={getTypeColor() as any}
                  variant="outlined"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
          { (
            <IconButton onClick={handleMarkAsRead} size="small">
              <CheckCircle color={notification.read? "success" : "action"} />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;