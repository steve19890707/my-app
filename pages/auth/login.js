import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from '../../src/context/firebase.context';

export default function Login() {
  const { auth, user } = useFirebase();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      console.log(user)
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case 'auth/invalid-email':
          break;
        case 'auth/user-not-found':
          break;
        case 'auth/wrong-password':
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      <h1>Login</h1>
      Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
      pwd: <input value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <button onClick={login}>Login</button>
    </>
  )

}