const api = typeof browser !== "undefined" ? browser : chrome;

console.log("Content script loaded successfully");

api.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);

  if (request.action === "generateErrors") {
    console.log("Generating 100 errors...");

    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const error = new Error("Probando, hola me escuchan.");
        console.error("Generated error:", error);

        if (window.onerror) {
          window.onerror(
            error.message,
            window.location.href,
            Math.floor(Math.random() * 1000),
            Math.floor(Math.random() * 100),
            error
          );
        }
      }, i * 10);
    }

    sendResponse({ success: true });
  }
});

console.log("Content script setup complete");
