import Toast from 'light-toast';

const Notification = () => (
  <button
    onClick={() => {
      Toast.success('', 5000000, () => {
        // do something after the toast disappears
      });
    }}
  >
    click me
  </button>
);

export default Notification;
