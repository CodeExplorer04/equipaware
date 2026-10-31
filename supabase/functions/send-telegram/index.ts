await fetch("https://api.telegram.org/bot<TOKEN>/sendMessage", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: "<8267207949:AAFIokMCtqDuD2I9CDRYs6_IsiYlPYKaWDs",
    text: "High risk detected for Hydraulic Press C2"
  }),
});