const button = document.querySelector('button')
const pre = document.querySelector('pre')

button.addEventListener("click", async () => {
  const data = {
    "webhook_endpoint": "http://127.0.0.1:3000/webhook/call_back"
  };

  const response = await fetch("http://127.0.0.1:8080/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const json = await response.json();

  pre.innerText = json;
})