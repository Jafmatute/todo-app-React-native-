import firebase from "firebase/app";
import "@firebase/firestore";

const configFirebase = {
  apiKey: "AIzaSyCmgHQXOqxIIII6t5bSAyh9FRQwgbOEYfc",
  authDomain: "todo-app-ac19c.firebaseapp.com",
  databaseURL: "https://todo-app-ac19c.firebaseio.com",
  projectId: "todo-app-ac19c",
  storageBucket: "todo-app-ac19c.appspot.com",
  messagingSenderId: "1075845599678",
  appId: "1:1075845599678:web:dba3e5a6d58abcf62729ef",
  measurementId: "G-G49V7JY93C",
};

//export default firebaseApp = firebase.initializeApp(configFirebase);

export function firebaseApp(callback) {
  if (!firebase.apps.length) {
    firebase.initializeApp(configFirebase);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //console.log("desde firebase Utils", user);
      callback(null, user);
    } else {
      firebase
        .auth()
        .signInAnonymously()
        .catch((error) => {
          //console.log(error);
          callback(error);
        });
    }
  });
}

export function getList(callback) {
  let ref = ref_().orderBy("name");

  unsubscribe = ref.onSnapshot((snopShot) => {
    lists = [];
    snopShot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
    });

    //console.log(lists);

    callback(lists);
  });
}

export function addListFirebase(list) {
  let ref = ref_();
  ref.add(list);
}

export function updateListFirebase(list) {
  let ref = ref_();
  ref.doc(list.id).update(list);
}

function ref_() {
  return firebase
    .firestore()
    .collection("article")
    .doc(userId())
    .collection("article");
}

export function userId() {
  return firebase.auth().currentUser.uid;
}
