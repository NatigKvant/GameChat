const {io} = require("socket.io-client")

export const webSocket = io("wss://test-chat-backend-hwads.ondigitalocean.app", {
    transports: ["websocket"],
    upgrade: false,
})