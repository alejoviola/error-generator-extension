document
  .getElementById("generateErrors")
  .addEventListener("click", async () => {
    try {
      const api = typeof browser !== "undefined" ? browser : chrome;
      const [tab] = await api.tabs.query({
        active: true,
        currentWindow: true,
      });

      console.log("Generating errors in tab:", tab.id);

      try {
        await api.scripting.executeScript({
          target: { tabId: tab.id },
          world: "MAIN",
          func: generateErrorsInPage,
        });
      } catch (scriptError) {
        console.log("Using DOM injection method");
        await api.scripting.executeScript({
          target: { tabId: tab.id },
          func: injectErrorsViaDOM,
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

function generateErrorsInPage() {
  console.log("Generating 100 errors in page context...");

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const error = new Error("Probando, hola me escuchan.");
      console.error("Generated error in page:", error);

      // This will be captured by Datadog RUM
      throw error;
    }, i * 10);
  }
}

function injectErrorsViaDOM() {
  console.log("Injecting errors via DOM...");

  const script = document.createElement("script");
  script.textContent = `
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const error = new Error("Probando, hola me escuchan.");
        console.error("Generated error via DOM:", error);
        throw error;
      }, i * 10);
    }
  `;

  document.head.appendChild(script);
  document.head.removeChild(script);
}
