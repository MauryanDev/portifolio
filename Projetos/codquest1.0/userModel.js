import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDuGldDCygw8TRgJS-7eg335I8NDHVEBWI",
  authDomain: "codequestproj.firebaseapp.com",
  databaseURL: "https://codequestproj-default-rtdb.firebaseio.com",
  projectId: "codequestproj",
  storageBucket: "codequestproj.appspot.com",
  messagingSenderId: "712045835470",
  appId: "1:712045835470:web:bee92e304792def7924c9f",
  measurementId: "G-EPFBCWZB27"
};
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, child, get, set, update, remove, push } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"
const db = getDatabase()
const usuariosRef = ref(db, 'Users');

export let admin = 'admin@gmail.com'

//Functions

export function addUser(name, email, password, pts) {
  push(ref(db, 'Users/'), {
    name: name, email: email, password: password, pts: pts
  })
}


export function getUser() {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `Users/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const database = Object.values(snapshot.val());
        resolve(database);
      } else {
        console.log("No data available");
        reject("No data available");
      }
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

export function getID(email) {
  return new Promise((resolve, reject) => {
    get(usuariosRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const usuario = childSnapshot.val();
            if (usuario.email === email) {
              const usuarioID = childSnapshot.key;
              const usuarioRef = ref(db, `Users/${usuarioID}`);
              console.log("ID do usuário com o email", email, "é:", usuarioID);
              resolve(usuarioRef)
            }
          })
        } else {
          console.log("No data available");
          reject("No data available");
        }
      }).catch((error) => {
        console.error(error);
        reject(error);
      });
  })
}

export async function getUserByEmail(email) {
  return await getUser().then((database) => {
    const userWithEmail = database.find(user => user.email.toLowerCase() === email.toLowerCase());
    return userWithEmail;
  });
}
export async function getUserByName(name) {
  return await getUser().then((database) => {
    const userWithName = database.filter(user => user.name.toLowerCase().startsWith(name.toLowerCase()));
    return userWithName;
  });
}
export async function getUsersPts() {
  return await getUser().then((database) => {
    const userOrderly = database.sort((a, b) => b.pts - a.pts);
    return userOrderly
  })
}



export function Update(email, novosDados) {
  getID(email).then((usuarioRef) => {
    set(usuarioRef, novosDados)
  })
}


export function Remove(email) {
  getID(email).then((usuarioRef) => {
    remove(usuarioRef)
  })
}


