import { doc, setDoc, getDocs, collection, query, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../src/context/firebase.context"
import { ulid } from "ulid";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function Post() {
  const { firestore, user } = useFirebase();
  const [posts, setPosts] = useState([]);

  const listPosts = async () => {
    const collectionRef = collection(firestore, "/posts");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const docs = [];
    querySnapshot.forEach(result => {
      // 訂閱這個文件的更新
      // onSnapshot(doc(firestore, `/posts/${result.id}`), doc => {
      //   console.log(doc.data());
      //   const index = posts.findIndex(post => post.id === result.id);
      //   if (index >= 0) {
      //     const update = [...posts].splice(index, 1,
      //       {
      //         ...doc.data(),
      //         id: result.id
      //       }
      //     )
      //     console.log(update)
      //     setPosts(update)
      //   }
      // })
      docs.push({ ...result.data(), id: result.id });
    })
    setPosts(docs);
  }

  useEffect(() => {
    listPosts();
  }, [])

  const createPost = async () => {
    if (user) {
      const docRef = doc(firestore, `/posts/${ulid()}`);
      await setDoc(docRef, {
        content: 'I am a toolman, I am tired.',
        authorId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      await listPosts();
    }
  }

  const updatePost = async () => {
  }

  const deletePost = async (id) => {
    const docRef = doc(firestore, `/posts/${id}`);
    await deleteDoc(docRef);
    await listPosts();
  }

  return (
    <>
      <div>Post</div>
      <button onClick={createPost}>Create Post</button>
      {posts.map((v, k) => <div key={k}>
        {_.get(v, "content")}
        <button onClick={() => deletePost(_.get(v, 'id'))}>delete</button>
      </div>)}
    </>
  )
}