const BudgetEvent = {
    System: 'system',          // Connection-related events
    Payment: 'payment',        // For sending payment information
    Update: 'budgetUpdate',    // For budget updates
  };
  class EventMessage {
    constructor(from, type, value) {
      this.from = from;       // Who sent the message
      this.type = type;       // Type of event (payment, update, etc.)
      this.value = value;     // Payment data or other details
    }
  }
    

  class PaymentNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      //this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket = new WebSocket(`ws://localhost:4000/ws`);

  
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
  
      this.socket.onmessage = (msg) => {
        try {
          const event = JSON.parse(msg.data);
          this.receiveEvent(event);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  
    broadcastPayment(payment) {
      const event = { type: 'payment', payload: payment };
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      this.events.push(event);
  
      this.handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
  
  const PaymentNotifierInstance = new PaymentNotifier();
  export default PaymentNotifierInstance;
  