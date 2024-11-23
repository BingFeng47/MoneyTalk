import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { OTP } from './Otp';
import { Button } from './ui/button';

const ConfirmationModal = () => {
  const [name, setName] = useState("Calvin Koay");
  const [bank, setBank] = useState("Maybank");
  const [amount, setAmount] = useState("200");
  const [isVisible, setIsVisible] = useState(false);

  // Connect to the WebSocket server
  const socket = io('https://bouz.ocealab.co/api/trigger-confirmation');  // WebSocket server URL

  useEffect(() => {
    // Listen for the 'trigger-confirmation' event from the server
    socket.on('trigger-confirmation', (data) => {
      setName(data.name);
      setBank(data.bank);
      setAmount(data.amount);
      setIsVisible(true); // Show the modal when data is received
    });

    // Cleanup WebSocket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleConfirm = () => {
    // Handle confirmation logic (emit confirmation response to the server)
    socket.emit('confirmation-response', { confirmed: true });
    setIsVisible(false); // Close the modal after confirmation
  };

  const handleCancel = () => {
    setIsVisible(false); // Close the modal without action
  };

  return (
    isVisible && (
      <div className="confirmation-modal-overlay">
        <div className="confirmation-modal-content">
          <p>PIN Number</p>
          <OTP />
          <p>
            Sending RM {amount} to {name} from <span className="capitalize">{bank}</span>
          </p>
          <div className="flex justify-around">
            <Button onClick={handleCancel} variant="default">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="default">
              Confirm
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;