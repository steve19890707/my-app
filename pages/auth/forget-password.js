// import { async } from "@firebase/util";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useFirebase } from "../../src/context/firebase.context";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const { auth } = useFirebase();

  const sendResetPasswordEmail = async () => {
    try {
      const result = await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <>
      <input value={email} onChange={event => setEmail(event.target.value)} />
      <button onClick={sendResetPasswordEmail}>send</button>
    </>
  )
}