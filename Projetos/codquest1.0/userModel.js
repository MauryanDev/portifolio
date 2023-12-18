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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"
const db = getDatabase()
const usuariosRef = ref(db, 'Users');
const auth = getAuth();

check()
export function check() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log('Usuário autenticado:', user.uid);
    } else {
      console.log('Nenhum usuário autenticado.');
    }
  })
};


export let admin = 'admin@gmail.com'

//Functions

export async function addUser(name, email, password, pts) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await push(ref(db, 'Users/'), {
      uid: user.uid,
      name: name,
      email: email,
      pts: pts
    });
  } catch (error) {
    showAlert('Email Invalido')
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}
export async function Login(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log('Usuário logado:', user.uid);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Erro ao fazer login:', errorCode, errorMessage);
    return null;
  }
}
export function logout() {
  signOut(auth)
    .then(() => {
      // Logout bem-sucedido
      console.log('Usuário deslogado');
    })
    .catch((error) => {
      // Tratar erros de logout
      console.error('Erro ao deslogar:', error);
    });
}


export function getUser() {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `Users/`)).then((snapshot) => {
      if (snapshot.exists()) {
        const database = Object.values(snapshot.val());
        resolve(database);
      } else {
        const database = []
        resolve(database)
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
              const userRef = ref(db, `Users/${usuarioID}`)
              console.log("ID do usuário com o email", email, "é:", usuarioID);
              resolve(userRef)
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
    console.log(userOrderly)
    return userOrderly
  })
}



export function Update(email, novosDados) {
  getID(email).then((usuarioRef) => {
    update(usuarioRef, novosDados)
  })
}


export async function Remove(email) {
  try {
    const uid = await getID(email)

    await remove(uidref);

    console.log(`Usuário com UID ${uid} deletado com sucesso.`);
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
  }
}



export function showAlert(texto) {

  document.getElementById('alertText').innerHTML = texto;

  document.getElementById('customAlert').style.display = 'block';
  const closeAlert = document.getElementById('closeAlert')
  closeAlert.addEventListener('click', function () {
    document.getElementById('customAlert').style.display = 'none'
  })
}


