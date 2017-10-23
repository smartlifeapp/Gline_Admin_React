import React from 'react';

const NotificationModal = ({ success, error, onModalClick }) => {
  if (!success && !error) return <div />;
  setTimeout(() => onModalClick('ok'), 2500);
  return (
    <div className="modal">
      <div className="notification">
        <h5>{success ? 'ⅈ 알림' : 'ⅈ 오류'}</h5>
        <p>{success || error}</p>
      </div>
    </div>
  );
};

export default NotificationModal;
