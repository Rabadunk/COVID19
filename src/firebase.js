import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyA4orDN93Xqovmv-I6K4Tj49zq32TdhZAo",
    authDomain: "covid19-ac41c.firebaseapp.com",
    databaseURL: "https://covid19-ac41c.firebaseio.com",
    projectId: "covid19-ac41c",
    storageBucket: "covid19-ac41c.appspot.com",
    messagingSenderId: "333817426267",
    appId: "1:333817426267:web:0c2109637f0c1b3ae76a7e",
    measurementId: "G-0N9F3FCLTG"
};
firebase.initializeApp(config);
export default firebase;