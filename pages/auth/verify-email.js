import { applyActionCode } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFirebase } from "../../src/context/firebase.context";

export default function verifyEmail() {
  const { auth } = useFirebase();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    if (!router.isReady) return;

    const { oobCode } = router.query;
    applyActionCode(auth, oobCode).then(() => {
      setIsVerified(true)
    })
      .catch(error => {
        console.log(error)
      })
  }, [router.isReady])
  return (<>
    verifyEmail: {isVerified ? 'ok' : 'wait..'}
  </>)
}