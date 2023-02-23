const { parentPort } = require("worker_threads");

parentPort.on("message", (message) => {
  console.log(`Message from main thread: ${message}`);
});

parentPort.postMessage("Hello from worker thread");
