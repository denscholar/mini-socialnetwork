import { useEffect, useState } from "react"
import { onSnapshot, collection } from '@firebase/firestore';
import { db } from "../../firebase";
import Post from "../post/Post";
import { Container } from '@mui/material';


const Posts = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const messagePost = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setPost(messagePost);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <Container
        style={{ marginTop: "20vh", marginBottom: "4vh" }}
        maxWidth="sm"
      >
        {posts.map(({ avatar, username, content_img, caption }) => {
          return <Post {...{ avatar, username, content_img, caption }} />;
        })}
      </Container>
    </div>
  );
};

export default Posts
