# Getting Started
Follow these steps to set up and start the webhook server:

1. **Install Dependencies:**

    ```bash
     npm install
    ```
2. **Configure environment variables**

    ```bash
     touch .env
    ```
- Copy and paste the below contents into the file
  
    ```bash
      RABBIT_MQ_URL="amqp://localhost"
      DATABASE_URL="postgresql://yourusername:yourpassword@localhost:5432/yourdatabase"
      JWT_SECRET=mysecretkeyforjsonwebtoken
    ```
3. Run database migration
   
    ```bash
      prisma migrate dev
    ```
    
5. Start the server
   ```bash
      npm run start
   ```

