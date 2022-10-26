import '../styles/globals.css'
import { FirebaseProvider } from "../src/context/firebase.context";

function MyApp({ Component, pageProps }) {
  return <FirebaseProvider><Component {...pageProps} /></FirebaseProvider>
}

export default MyApp
