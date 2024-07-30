# Getting Started
Follow these steps to set up and start the messaging service:

1. **Install Dependencies:**

    ```bash
     npm install
    ```
2. **Configure environment variables**

    ```bash
     touch .env
    ```
- Add below variables to your file
  
    ```bash
      BREVO_EMAIL_API_KEY=
      SMS_API_KEY = 
      
      EMAIL_HOST=smtp-relay.brevo.com
      EMAIL_PORT=587
      EMAIL_USERNAME=
      EMAIL_PASSWORD=
      ADMIN_EMAIL_USERNAME=
    ```
 
5. Start the server
   ```bash
      npm run start
   ```

## Make sure your Rabbit MQ container/service is running.

