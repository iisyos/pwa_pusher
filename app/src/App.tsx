import { useCallback } from "react";

import "./App.css";

function App() {
  const unregisterSubscription = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration != null) {
        console.log(registration);
        const subscription = await registration.pushManager.getSubscription();
        console.log(subscription);
        if (subscription) {
          await subscription.unsubscribe();
        }
      }
    }
  }, []);

  const registerSubscription = useCallback(async () => {
    Notification.requestPermission(async (permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={registerSubscription}>Subscribe</button>
        <button onClick={unregisterSubscription}>Unsubscribe</button>
      </div>
    </>
  );
}

export default App;
