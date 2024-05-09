import requests
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
cors = CORS(app)

def webhook_callback(request_json):
    time.sleep(3)

    content = json.loads(request_json)

    return_data = {
      "message": "Task was completed.",
      "id": content["id"]
    }

    requests.post(content['webhook_endpoint'], json=return_data, timeout=5)
    print("Task was completed and sent.")

@app.route('/', methods=['POST'])
def index():
    print("Successfully recieved request.")

    print("Starting task.")
    content = json.dumps(request.json)
    threading.Thread(target=webhook_callback, args=(content,)).start()

    return jsonify({"message": "Accepted"}), 202

if __name__ == '__main__':
    app.run(port=8080, debug=True)
