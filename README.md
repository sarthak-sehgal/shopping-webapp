# Note: This project is currently under development.
# Shopping App
A standard shopping web app for both users and administrators.

# Run locally
## Prerequisites
### Setup Firebase project
 - Setup a new Firebase project.
 - Setup Phone authentication for your project.
 - Add "+91 12345 67890" as a new test phone number with "123456" as the verification code. This will be used for admin access.
 - Setup Storage for your firebase project.

### Clone the repository
```
git clone https://github.com/sarthak-sehgal/shopping-webapp
cd shopping-webapp/
npm install
```

### Make changes to firebaseConfig.js
Replace the keys with your own firebase configuration.
```
var config = {
    apiKey: "your_api_key",
    authDomain: "your_firebase_domain",
    databaseURL: "your_firebase_db_url",
    projectId: "your_firebase_project_id",
    storageBucket: "your_firebase_storage_url",
    messagingSenderId: "your_firebase_messaging_sender_id"
};
```

### Run project
```
npm start
```