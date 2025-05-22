import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { WifiOff, Wifi } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './ConnectionStatus.module.css';

const ConnectionStatus: React.FC = () => {
  const { connected, timestamp } = useSelector((state: RootState) => state.notifications.connectionStatus);

  return (
    <Box className={styles.container}>
      <Chip
        icon={connected ? <Wifi /> : <WifiOff />}
        label={connected ? 'Connected' : 'Disconnected'}
        color={connected ? 'success' : 'error'}
        size="medium"
      />
      {timestamp && (
        <Typography variant="caption" color="text.secondary">
          {connected ? 'Connected' : 'Disconnected'} at {new Date(timestamp).toLocaleTimeString()}
        </Typography>
      )}
    </Box>
  );
};

export default ConnectionStatus;