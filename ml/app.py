from flask import Flask, request, jsonify

app = Flask(__name__)

# Simple CORS headers support
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "online",
        "service": "EquipAware ML Predictive Failure Microservice",
        "version": "1.0.0"
    })


@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"})

    data = request.json or {}
    sensor1 = float(data.get("sensor1", 0))
    sensor2 = float(data.get("sensor2", 0))
    temperature = float(data.get("temperature", 0))
    vibration = float(data.get("vibration", 0))
    operating_hours = float(data.get("operating_hours", 0))

    score = (sensor1 + sensor2 + temperature + vibration + operating_hours / 100) / 500
    risk = max(0.0, min(1.0, score))

    return jsonify({
        "failure_risk": round(risk, 4),
        "predicted_failure": risk > 0.7,
        "severity": "CRITICAL" if risk > 0.85 else ("WARNING" if risk > 0.65 else "NORMAL"),
        "recommended_action": (
            "Urgent: Immediate safety shutdown and bearing replacement required."
            if risk > 0.7
            else "Standard scheduled maintenance window adequate."
        )
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
