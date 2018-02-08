import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// THIS does not work
admin.initializeApp(functions.config().firebase)

// THIS works
// const serviceAccount = require(`${__dirname}/../eddystone-dev.json`);
// admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

export const helloWorld = functions.https.onRequest((request, response) => {
    const token = request.query.token;
    const payload = {
        notification: {
            title: 'test',
            body: 'test-of-body',
        }
    }
    admin.messaging().sendToDevice(token, payload)
    .then(() => response.send('success sending function'))
    .catch(err => response.send(err.message))
});
