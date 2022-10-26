import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import { useFirebase } from "../../src/context/firebase.context";

export default function ResetPassword({ oobCode }) {
  const [pwd, setPwd] = useState('');
  const { auth } = useFirebase();
  const resetPassword = async () => {
    try {
      const result = await confirmPasswordReset(auth, oobCode, pwd)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(oobCode)
  return (<>
    ResetPassword
    <input type={"password"} value={pwd} onChange={e => setPwd(e.target.value)} />
    <button onClick={resetPassword}>reset pwd</button>
  </>)
}

export async function getServerSideProps({ req, res, query }) {
  // console.log(query)
  const { oobCode } = query;
  return {
    props: {
      oobCode
    }, // will be passed to the page component as props
  }
}