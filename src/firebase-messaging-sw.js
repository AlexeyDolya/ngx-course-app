importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.6.0/firebase-messaging.js');

var config = {
    apiKey: 'AIzaSyC9fggBzxM_9CXgdi82ZecI-Wu5NcOkNgg',
    authDomain: 'ngx-course.firebaseapp.com',
    databaseURL: 'https://ngx-course.firebaseio.com',
    projectId: 'ngx-course',
    storageBucket: 'ngx-course.appspot.com',
    messagingSenderId: '881969052371',
};
try {
    firebase.initializeApp(config);

    const messaging = firebase.messaging();
} catch (err) {
    console.log('FIREBASE SW==>', err);
}
