const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.test = functions.https.onCall((data, context) => {
  console.log(data)
  // console.log(context)
  return { a: 2 };
})

exports.onPostCreate = functions.firestore.document(`/posts/{id}`).onUpdate((change, context) => {
  console.log(change.before.data())
  console.log(change.after.data())
})
