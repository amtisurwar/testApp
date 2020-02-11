const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase by testApp!');
});

exports.updateRole = functions.https.onRequest((request, response) => {
  admin
    .auth()
    .getUser(request.uid)
    .then(user => {
      // Add incremental custom claim without overwriting existing claims.
      const currentCustomClaims = user;
      if (currentCustomClaims.role) {
        // Add level.
        currentCustomClaims['role'] = request.role;
        // Add custom claims for additional privileges.
        return admin.auth().setCustomUserClaims(user.uid, currentCustomClaims);
      } else {
        return user;
      }
    })
    .catch(error => {
      console.log(error);
    });
});

