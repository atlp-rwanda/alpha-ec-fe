'use client';
import { useAppDispatch } from '@/redux/hooks/hook';
import { markNotificationAsRead } from '@/redux/slices/notification';
import React, { useState } from 'react';

interface ReadMoreProps {
  message: string;
  id: string;
}

export const ReadMore: React.FC<ReadMoreProps> = ({ message, id }) => {
  const maxWords = 2;
  const words = message.split(' ');
  const truncated = words.slice(0, maxWords).join(' ');
  const remaining = words.slice(maxWords).join(' ');

  const dispatch = useAppDispatch();
  const initialIsRead = localStorage.getItem(`isRead`) === 'true';
  const [showFullText, setShowFullText] = useState(false);
  const [isRead, setIsRead] = useState(initialIsRead);

  const toggleFullText = () => {
    setShowFullText(!showFullText);
    if (!isRead) {
      setIsRead(true);
      dispatch(markNotificationAsRead(id));
      localStorage.setItem(`isRead`, 'true');
    }
  };

  return (
    <div>
      {showFullText ? (
        <div style={{ color: isRead ? 'grey' : 'black' }}>
          {message}{' '}
          <span className="text-blue">
            <a href="#" onClick={toggleFullText}>
              show less
            </a>
          </span>
        </div>
      ) : (
        <div style={{ color: isRead ? 'grey' : 'black' }}>
          {truncated}{' '}
          {remaining && (
            <span className="text-blue">
              <a href="#" onClick={toggleFullText}>
                ...read more
              </a>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
