import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "<KEY>",
    authDomain: "mova-2021.firebaseapp.com",
    projectId: "mova-2021",
    storageBucket: "mova-2021.appspot.com",
    messagingSenderId: "1018442115919",
    appId: "1:1018442115919:web:177117271217771217711"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);