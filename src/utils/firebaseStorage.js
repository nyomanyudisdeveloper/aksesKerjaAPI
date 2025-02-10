import admin from 'firebase-admin'
import { v4 as uuidv4 } from "uuid"
import dotenv from 'dotenv'


dotenv.config()

const {privateKey} = JSON.parse(process.env.GCP_PRIVATE_KEY)

admin.initializeApp({
    credential: admin.credential.cert({
        type:process.env.GCP_TYPE,
        project_id:process.env.GCP_PROJECT_ID,
        private_key_id:process.env.GCP_PRIVATE_KEY_ID,
        private_key:privateKey,
        client_email:process.env.GCP_CLIENT_EMAIL,
        client_id:process.env.GCP_CLIENT_ID,
        auth_uri:process.env.GCP_AUTH_URI,
        token_uri:process.env.GCP_TOKEN_URI,
        auth_provider_x509_cert_url:process.env.GCP_AUTH_PROVIDER,
        client_x509_cert_url:process.env.GCP_CERT_URL,
        universe_domain:process.env.GCP_UNIVERSE_DOMAIN
    }),
    storageBucket: process.env.GCP_BUCKET_URL, 
});


const bucket = admin.storage().bucket();

export const uploadImageToFirebaseStorage = async(file) => {
    try {
      const fileName = `${uuidv4()}-${file.originalname}`; 
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype, // Set the correct MIME type
        },
      });

      blobStream.on('error', (err) => {
        console.error('Upload error:', err);
      });

      blobStream.on('finish', async () => {
        await blob.makePublic();
      });

      blobStream.end(file.buffer);
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      return publicUrl
      // return fileName
    } catch (error) {
      console.error('Error uploading file:', error);
    }
}



