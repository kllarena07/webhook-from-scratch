import requests
import json
from flask import Flask, jsonify, request
import threading
import time

app = Flask(__name__)

def webhook_callback(request_json):
    time.sleep(3)

    content = json.loads(request_json)

    return_data = {
      "message": "Task was completed."
    }

    requests.post(content['webhook_endpoint'], json=return_data, timeout=5)

@app.route('/', methods=['POST'])
def index():
    print("Successfully recieved request.")

    print("Starting task.")
    content = json.dumps(request.json)
    threading.Thread(target=webhook_callback, args=(content,)).start()

    return jsonify({"message": "Accepted"}), 202

if __name__ == '__main__':
    app.run(port=8080, debug=True)
