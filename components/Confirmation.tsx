import { useEffect, useState } from "react";
import io from 'socket.io-client';

const ConfirmationModal = () => {
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const socket = io('https://your-nextjs-api-url.com');  // WebSocket server
  
      socket.on('trigger-confirmation', (data) => {
        setMessage(data.message);
        setIsVisible(true); // Show the modal
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const handleConfirm = () => {
      // Handle confirmation logic (e.g., send response to server)
      setIsVisible(false);
    };
  
    const handleCancel = () => {
      setIsVisible(false); // Close the modal without action
    };
  
    return (
      isVisible && (
        <div className="confirmation-modal">
          <p>{message}</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )
    );
  };
  
  export default ConfirmationModal;