/**
 * 心跳检测的基本步骤
 * 建立 WebSocket 连接：客户端和服务器之间建立 WebSocket 连接。
 * 定期发送心跳消息：客户端定期向服务器发送心跳消息（如 "ping"）。
 * 服务器响应心跳消息：服务器收到心跳消息后，回复一个响应消息（如 "pong"）。
 * 检测连接状态：如果客户端在预定时间内未收到服务器的响应，则认为连接断开，并进行重新连接或其他处理。
 * 
 * WebSocket 心跳检测的间隔时间没有严格的标准，这取决于应用的具体需求和网络环境。
 * 通常，心跳检测的间隔时间（heartbeat interval）可以设置在 10 到 60 秒之间。
 * 选择心跳间隔时需要平衡以下几个因素：
 */

class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.heartbeatInterval = 5000; // 心跳间隔时间，单位为毫秒
    this.heartbeatTimer = null;
    this.reconnectInterval = 10000; // 重连间隔时间，单位为毫秒
    this.reconnectTimer = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connection opened');
      this.startHeartbeat();
    };

    this.ws.onmessage = (message) => {
      console.log('Received message:', message.data);
      if (message.data === 'pong') {
        this.resetHeartbeat();
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      this.stopHeartbeat();
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.stopHeartbeat();
      this.reconnect();
    };
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send('ping');
      }
    }, this.heartbeatInterval);
  }

  resetHeartbeat() {
    clearInterval(this.heartbeatTimer);
    this.startHeartbeat();
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  reconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = setTimeout(() => {
      console.log('Reconnecting...');
      this.connect();
    }, this.reconnectInterval);
  }
}

// 使用示例
const wsClient = new WebSocketClient('ws://your-websocket-server');
wsClient.connect();
