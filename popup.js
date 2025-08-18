document
  .getElementById("generateErrors")
  .addEventListener("click", async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    browser.tabs.sendMessage(tab.id, { action: "generateErrors" });

    document.getElementById("status").textContent = "Generating 100 errors...";

    setTimeout(() => {
      document.getElementById("status").textContent =
        "Errors generated successfully!";
    }, 2000);
  });
