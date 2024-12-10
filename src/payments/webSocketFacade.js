class BudgetEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
  
      this.socket.onopen = (event) => {
        this.receiveEvent(new EventMessage('System', BudgetEvent.System, { msg: 'connected' }));
      };
  
      this.socket.onclose = (event) => {
        this.receiveEvent(new EventMessage('System', BudgetEvent.System, { msg: 'disconnected' }));
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {
          console.error('Failed to parse incoming message.');
        }
      };
    }
  
    broadcastPayment(from, paymentDetails) {
      const event = new EventMessage(from, BudgetEvent.Payment, paymentDetails);
      this.socket.send(JSON.stringify(event));
    }
  
    broadcastBudgetUpdate(from, budgetData) {
      const event = new EventMessage(from, BudgetEvent.Update, budgetData);
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
  
      this.events.forEach((e) => {
        this.handlers.forEach((handler) => {
          handler(e);
        });
      });
    }
  }
  