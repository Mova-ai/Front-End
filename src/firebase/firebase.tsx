import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCdj0TJYFDbzvYHeqyNnf-kXBrt4e4M3wk",
    authDomain: "mova-2021.firebaseapp.com",
    projectId: "mova-2021",
    storageBucket: "mova-2021.firebasestorage.app",
    messagingSenderId: "220317421379",
    appId: "1:220317421379:web:08884a53e94825fe98a9f6",
    measurementId: "G-ECMP4Y8T9K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);