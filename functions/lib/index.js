"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const key = require("./service-key.json"); // your service file here
const googleapis_1 = require("googleapis");
const authClient = new googleapis_1.google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/datastore", "https://www.googleapis.com/auth/cloud-platform"]
});
const firestoreClient = googleapis_1.google.firestore({
    version: "v1beta2",
    auth: authClient
});
exports.backupFirestore = functions.pubsub.schedule('every day 00:00').onRun(async (context) => {
    const projectId = process.env.GCP_PROJECT;
    const timestamp = new Date().toISOString();
    console.log(`Start to backup project ${projectId}`);
    await authClient.authorize();
    return firestoreClient.projects.databases.exportDocuments({
        name: `projects/${projectId}/databases/(default)`,
        requestBody: {
            outputUriPrefix: `gs://${projectId}-firestore-backups/backups/${timestamp}`
        }
    });
});
//# sourceMappingURL=index.js.map