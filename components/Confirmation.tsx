import { useEffect, useState } from 'react';
import { OTP } from './Otp';
import { Button } from './ui/button';
import { useSupabase } from '@/app/demo/layout';

interface Notification {
  name: string;
  amount: number;
  bank: string;
}

const ConfirmationModal = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const supabase = useSupabase();
  const [cuurentBalance, setCurrentBalance] = useState(0)
  const [maxId, setMaxId] = useState(null);


  useEffect(() => {
    // Fetch notification initially
    const fetchNotification = async () => {
      const { data, error } = await supabase
        .from('trigger-notification')
        .select('*')
        .single(); // Fetch the latest notification, limit 1 and return a single row
      
      if (error) {
        console.error('Error fetching notification:', error);
        return;
      }
      
      if (data) {
        setNotification(data); // Set the notification state
      }
    };

    fetchNotification(); // Initial fetch

    // Subscribe to real-time changes in the 'trigger-notification' table
    const subscription = supabase
      .channel('realtime-notification') // Channel name can be anything
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trigger-notification' }, (payload) => {
        console.log('Change detected:', payload);
        setIsVisible(true); // Show the modal when there's an update
        fetchNotification(); // Re-fetch notification on any change
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase]);

  useEffect(() => {
    const fetchMaxId = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setMaxId(data[0].id);
      } else {
        setMaxId(null);
      }
    };
    fetchMaxId();

  }, [notification]);

  const handleConfirm = () => {


    const fetchUserBalance = async () => {
      const { data, error } = await supabase
        .from('user')
        .select('cimb_balance')
        .eq('id', '2024001')
        .single();

      if (error) {
        console.error('Error fetching user balance:', error);
        return;
      }

      if (data) {
        const updateBalance = async () => {
          if (notification) {
            const { error } = await supabase
              .from('user')
              .update({ cimb_balance: data.cimb_balance - notification.amount })
              .eq('id', '2024001');


              const { } = await supabase
              .from('transactions')
              .insert([
                {
                  id: maxId! + 1,
                  user_id: 2024001, // Replace with actual user ID
                  date: new Date().toISOString(),
                  amount: Number(notification.amount),
                  transaction_type: 'debit',
                  bank: 'cimb',
                  description: `Funds Transfer to ${notification.name}`,
                  category: 'Others',
                  payment_method: 'Bank Transfer', // Replace with actual payment method
                },
              ]);
    
            if (error) {
              console.error('Error updating balance:', error);
            }
          }
        };
    
        updateBalance();


        

      }
    };

    fetchUserBalance();

    
    setIsVisible(false); // Close the modal after confirmation
  };

  const handleCancel = () => {
    setIsVisible(false); // Close the modal without action
  };

  // Render nothing if there's no notification
  if (!notification) {
    return null;
  }

  return (
    isVisible && (
      <div className="confirmation-modal-overlay">
        <div className="confirmation-modal-content">
          <p>PIN Number</p>
          <OTP />
          <p>
            Sending RM {notification.amount} to {notification.name}
          </p>
          <div className="flex  gap-6">
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