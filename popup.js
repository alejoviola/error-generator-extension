document
  .getElementById("generateErrors")
  .addEventListener("click", async () => {
    try {
      const api = typeof browser !== "undefined" ? browser : chrome;
      const [tab] = await api.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log("Sending message to tab:", tab.id);

      try {
        const response = await api.tabs.sendMessage(tab.id, {
          action: "generateErrors",
        });
        console.log("Response received:", response);
      } catch (messageError) {
        console.log("Content script not available, using scripting API");

        await api.scripting.executeScript({
          target: { tabId: tab.id },
          func: generateErrors,
        });
      }

      document.getElementById("status").textContent =
        "Generating 100 errors...";

      setTimeout(() => {
        document.getElementById("status").textContent =
          "Errors generated successfully!";
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("status").textContent = "Error: " + error.message;
    }
  });

function generateErrors() {
  console.log("Generating 100 errors via scripting API...");

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
}
