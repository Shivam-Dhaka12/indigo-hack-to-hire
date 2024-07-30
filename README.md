The backend of this project is designed with a microservice architecture:

## Webhook Service:

Functionality: Admins can push flight status changes to the database via a webhook. This service queries the database to find users subscribed to the affected flight and creates three types of notifications: SMS, in-app, and email.
Message Handling: Notifications are pushed to RabbitMQ. This service also functions as a WebSocket server to communicate real-time updates to connected clients via Socket.io. (Note: Socket.io integration is in progress and not yet fully functional.)
Benefit: This event-driven architecture allows for scalable and efficient notification management by reacting to real-time events and updating subscribers promptly.

## Messaging Service:

Functionality: Consumes messages from RabbitMQ and sends notifications via email and SMS.
Email: Uses Nodemailer for sending email notifications.
SMS: (Integration in progress, pending due to time constraints.)
API Service:

## Functionality: Handles user authentication and provides API endpoints for the frontend.
Endpoints:
Search Flights: Search for flights by flight ID, airline, arrival gate, or departure gate.
Subscribe: Allow users to subscribe to flight updates.
Notifications: Provide notifications on flight status changes.

## Run the application:

First make sure you have docker installed.

## Start postgres via Docker

```bash
docker run -e POSTGRES_USER=yourusername -ePOSTGRES_DB=yourdatabase -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres
```

- Store this connection url for later requirement. 
## 
    ConnectionString: postgresql://yourusername:yourpassword@localhost:5432/yourdatabase

## Start RabbitMQ via Docker
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

### To start rest of the services move into their respective directories and follow the steps in their readme files.
