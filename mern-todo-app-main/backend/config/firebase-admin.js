import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Initialize Firebase Admin with service account
const serviceAccount = {
  "type": "service_account",
  "project_id": "to-do-app-77fac",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "YOUR_CLIENT_CERT_URL"
};

// For development, we can initialize without a service account
// using the project ID from the frontend Firebase config
const app = admin.initializeApp({
  projectId: 'to-do-app-77fac',
});

export const auth = admin.auth(app);
export default admin;