let id = null;

window.addEventListener('load', async () => {
  const response = await fetch('http://127.0.0.1:3000/register')
  const data = await response.json();

  id = data.id;

  console.log(id);
});

const button = document.querySelector('button');
const initial = document.getElementById("initial");
const final = document.getElementById("final");

button.addEventListener("click", async () => {
  const data = {
    "webhook_endpoint": "http://127.0.0.1:3000/webhook/callback",
    "id": id
  };

  const response = await fetch("http://127.0.0.1:8080/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const json = await response.json();

  initial.innerText = JSON.stringify(json);

  const event_source = new EventSource(`http://127.0.0.1:3000/webhook/callback/${id}`);

  event_source.addEventListener("message", (e) => {
    console.log(JSON.parse(e.data));
    final.innerText = e.data;
  });
});