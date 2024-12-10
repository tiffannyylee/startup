// // mockWebSocket.js
// import { useEffect } from 'react';

// export function MockWebSocket({ onMessage }) {
//   useEffect(() => {
//     // Mock: Send a "new payment" every 5 seconds
//     const interval = setInterval(() => {
//       const fakePayment = {
//         id: Math.random().toString(36).substr(2, 9),
//         amount: Math.floor(Math.random() * 100) + 1,
//         bucket: 'bucket' + (Math.floor(Math.random() * 3) + 1),
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       onMessage(fakePayment);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [onMessage]);

//   return null;
// }
