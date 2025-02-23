export const integrationSpecSettings = {
    "data": {
        "date": {
            "created_at": "2025-02-19",
            "updated_at": "2025-02-19"
        },
        "descriptions": {
            "app_description": "Sends alerts to a Telex channel if a cloud instance goes down.",
            "app_logo": "https://img.freepik.com/free-photo/two-clouds-with-camera_1048-1666.jpg?ga=GA1.1.1029648335.1740049750&semt=ais_hybrid",
            "app_name": "Cloud Instance Monitor",
            "app_url": "https://cloud-instance-monitor.onrender.com",
            "background_color": "#ffffff"
        },
        "integration_category": "Monitoring & Logging",
        "integration_type": "interval",
        "is_active": true,
        "key_features": [
            "Notifies user when an instance is down",
            "Tracks instance status and sends alerts."
        ],
        "author": "ayesorobolu",

        "settings": [
            {
              "label": "instance_urls",
              "type": "text",
              "description": "Comma-separated list of instance URLs or IPs to monitor.",
              "required": true,
              "default": ""
            },
            {
              "label": "check_interval",
              "type": "text",
              "description": "Cron expression defining how frequently to check the instances.",
              "required": true,
              "default": "* * * * *" 
            }
          ],
        "tick_url": "https://cloud-instance-monitor.onrender.com/tick",
        "target_url": ""
    }
}