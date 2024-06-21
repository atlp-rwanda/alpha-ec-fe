import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch } from '@/redux/hooks/hook';
import { addNotification } from '@/redux/slices/notification';

const useSocket = (userId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket: Socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on(userId, notification => {
      console.log('notifications', notification);
      dispatch(addNotification(notification));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, userId]);

  return null;
};

export default useSocket;
