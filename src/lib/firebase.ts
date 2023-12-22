import { initializeApp, type FirebaseApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
	apiKey: "AIzaSyAzz-mceNyFGQknpKHmX5z_YlVe5Mk4DPo",
	authDomain: "pattapatta-37622.firebaseapp.com",
	projectId: "pattapatta-37622",
	storageBucket: "pattapatta-37622.appspot.com",
	messagingSenderId: "626102423213",
	appId: "1:626102423213:web:f7cd5d66a193b619ac0024",
	measurementId: "G-D5WM2H39Q2"
};

let app: FirebaseApp
let db
let auth = {}

Promise.all([
	app = initializeApp(firebaseConfig),
]).then(() => {
	auth = getAuth(app)
	// db = getFirestore(app)
	return auth
}).then(() => {
	db = getFirestore(app)
}).catch((error) => console.log(`LOG..firebase: error`, error))


export { auth, app, db, }
