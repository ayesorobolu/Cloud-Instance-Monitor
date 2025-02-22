export const integrationSpecSettings = {
    "data": {
        "date": {
            "created_at": "2025-02-19",
            "updated_at": "2025-02-19"
        },
        "descriptions": {
            "app_description": "Sends alerts to a Telex channel if a cloud instance goes down.",
            "app_logo": "https://cdn-ak.f.st-hatena.com/images/fotolife/b/bst-tech/20211206/20211206113340.png",
            "app_name": "Cloud Instance Monitor",
            "app_url": "https://your-deployed-url.onrender.com",
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
        "tick_url": "https://your-deployed-url.onrender.com/tick",
        "target_url": ""
    }
}