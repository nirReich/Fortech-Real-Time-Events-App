import React from "react";
import { Box, Typography, Button, Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector, useDispatch } from "react-redux";
import { RootState, clearNotifications } from "../../store";
import NotificationCard from "../NotificationCard/NotificationCard";
import styles from "./NotificationList.module.css";

const NotificationList: React.FC = () => {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const dispatch = useDispatch();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClearAll = () => {
    dispatch(clearNotifications());
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h5" component="h2">
          Live Notifications
          {unreadCount > 0 && (
            <div className={styles.badge}>
            <Badge badgeContent={unreadCount} color="primary" >
              <MailIcon color="action" />
            </Badge>
            </div>
          )}
        </Typography>
        {notifications.length > 0 && (
          <Button variant="outlined" size="small" onClick={handleClearAll}>
            Clear All
          </Button>
        )}
      </Box>

      <Box className={styles.list}>
        {notifications.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            py={4}
          >
            No notifications yet. Waiting for live updates...
          </Typography>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default NotificationList;
