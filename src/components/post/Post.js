import { Card, CardHeader, Typography, Avatar, CardMedia, CardContent } from '@mui/material';
import { getDownloadURL, ref } from "@firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase";


const Post = ({ avatar, username, caption, content_img }) => {
    const [uRL, setURL] = useState("");
    useEffect(() => {
        getDownloadURL(ref(storage, content_img))
          .then((url) => setURL(url))
          .catch((err) => console.log(err));
      }, [content_img]);

    return (
        <Card style={{ marginTop: '2vh' }}>
            <CardHeader
                avatar={
                    <Avatar src={avatar} sx={{ backgroundColor: 'red' }} aria-label="recipe" />
                }
                title={<Typography style={{ fontWeight: '600' }} variant='subtitle1'>
                    {username}
                </Typography>}
            ></CardHeader>
            <CardMedia style={{
                height: '0',
                paddingTop: '56.25%'
            }}
            image={uRL}
            />
            <CardContent>
                <p style={{margin: '0'}}><strong>Post made by {username}</strong></p>
                {caption}
            </CardContent>



        </Card>
    )
}

export default Post
