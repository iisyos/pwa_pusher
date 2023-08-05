import { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [registerd, setRegisterd] = useState(false);

  useEffect(() => {
    console.log("registerd:", registerd);
  }, [registerd]);

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
        setRegisterd(false);
      }
    }
  }, []);

    // プッシュ通知を送信する
    const sendSubscription = useCallback(async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          console.log(subscription);
          if (subscription) {
            const result = await axios
              .post("http://localhost:3000/sendNotification", {
                subscription
              })
              console.log(result);
          }
        }
      }
    }, []);

  const registerSubscription = useCallback(async () => {
    Notification.requestPermission(async (permission) => {
      if (permission === "granted" && import.meta.env.VITE_VAPID_PUBLIC) {
        const urlB64ToUint8Array = (base64String: string) => {
          const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
          const base64 = (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");

          const rawData = window.atob(base64);
          const outputArray = new Uint8Array(rawData.length);

          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
          }
          return outputArray;
        };
        if ("serviceWorker" in navigator) {
          const options = {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(
              import.meta.env.VITE_VAPID_PUBLIC
            ),
          };

          const registration = await navigator.serviceWorker.ready;
          const pushSubscription = await registration.pushManager.subscribe(
            options
          );
          console.log(pushSubscription);
          
          setRegisterd(true);
        }

      }
    });
  }, []);

  return (
    <>
      <div className="card">
        <button onClick={registerSubscription}>Subscribe</button>
        <button onClick={unregisterSubscription}>Unsubscribe</button>
      </div>
      <button onClick={sendSubscription}>Send</button>
    </>
  );
}

export default App;
