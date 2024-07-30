# Indigo Real-Time Push Notification System
Welcome to the Indigo Real-Time Push Notification System! This application is designed to provide real-time updates and notifications for flight status changes, keeping users informed with timely alerts.

## Stack
### Frontend:

- React.js: For building a dynamic and interactive user interface.
- Aceternity UI: For pre-designed UI components.
- Recoil.js: For state management.
- React Router: For routing and navigation.
- Tailwind CSS: For styling and responsive design.

### Backend:

- Node.js: For server-side logic.
- PostgreSQL: For database management with Prisma ORM.
- RabbitMQ: For message queuing.
- Nodemailer: For sending emails.
- Socket.io: For real-time communication (Note: Integration pending due to time constraints).
- JWT: For authentication.
  
## Project Structure
The backend of this project is designed with a microservice architecture:

### Webhook Service:

- Functionality: Admins can push flight status changes to the database via a webhook. This service queries the database to find users subscribed to the affected flight and creates three types of notifications: SMS, in-app, and email.
- Message Handling: Notifications are pushed to RabbitMQ. This service also functions as a WebSocket server to communicate real-time updates to connected clients via Socket.io. (Note: Socket.io integration is in progress and not yet fully functional.)
- Benefit: This event-driven architecture allows for scalable and efficient notification management by reacting to real-time events and updating subscribers promptly.

### Messaging Service:

- Functionality: Consumes messages from RabbitMQ and sends notifications via email and SMS.
- Email: Uses Nodemailer for sending email notifications.
- SMS: (Integration in progress, pending due to time constraints.)

### API Service:

- Functionality: Handles user authentication and provides API endpoints for the frontend.
- Endpoints:
  - Search Flights: Search for flights by flight ID, airline, arrival gate, or departure gate.
  - Subscribe: Allow users to subscribe to flight updates.
  - Notifications: Provide notifications on flight status changes.
- User Flow
  - Authentication: Users visit the website and authenticate themselves.
  - Flight Search: Users search for their desired flight using flight ID, airline, arrival gate, or departure gate.
  - Subscription: Users subscribe to notifications for the selected flight.
  - Notifications: When there is an update to the flight details, users receive notifications via email and SMS. (Note: In-app notifications are planned but not yet integrated.)

## Setup
To get started with this project, follow these steps:

### Clone the Repository:
    git clone https://github.com/Shivam-Dhaka12/indigo-hack-to-hire.git

### Frontend: 
#### Install dependencies
    cd indigo-hack-to-hire
  
    git checkout frontend
    npm install

#### Configure
    touch .env
- Add your .environment variables.
- configure any other config files if needed.

#### Run the application
    npm run dev

### Backend:

- For backend, see the detailed steps for each service in their respective directories.
- Backend:
  - api/
  - messaging/
  - webhook/    

License
This project is licensed under the MIT License - see the LICENSE file for details.
