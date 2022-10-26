import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { useFirebase } from '../../src/context/firebase.context';

export default function Register() {
  const { auth } = useFirebase();
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      // 把displayname 更新
      await updateProfile(userCredential.user, { displayname });
      // email 驗證
      await sendEmailVerification(userCredential.user);
      // const userCredential = await signInWithEmailAndPassword(auth, email, pwd);
      console.log(userCredential)
    } catch (error) {
      console.log(error.code);
      // switch (error.code) {
      //   case 'auth/invalid-email':
      //     break;
      //   case 'auth/user-not-found':
      //     break;
      //   case 'auth/wrong-password':
      //     break;
      //   default:
      //     break;
      // }
    }
  };

  return (
    <>
      <h1>Register</h1>
      DisplayName: <input value={displayname} onChange={(e) => setDisplayname(e.target.value)} />
      Email: <input value={email} onChange={(e) => setEmail(e.target.value)} />
      pwd: <input value={pwd} onChange={(e) => setPwd(e.target.value)} />
      <button onClick={register}>Register</button>
    </>
  )
}