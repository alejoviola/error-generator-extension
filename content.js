chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateErrors") {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const error = new Error("Probando, hola me escuchan.");
        error.stack = `Error: Probando, hola me escuchan.\n    at <anonymous> (${
          window.location.href
        }:${Math.floor(Math.random() * 1000)}:${Math.floor(
          Math.random() * 100
        )})`;

        // Show in console
        console.error(error);

        // Dispatch error event
        window.dispatchEvent(
          new ErrorEvent("error", {
            message: error.message,
            error: error,
            filename: window.location.href,
            lineno: Math.floor(Math.random() * 1000),
            colno: Math.floor(Math.random() * 100),
          })
        );

        // Also trigger global error handler
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
  }
});
