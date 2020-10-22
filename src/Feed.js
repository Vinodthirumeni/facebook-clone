import React, { useState, useEffect } from "react";
import "./Feed.css";
import StoryReel from "./StoryReel";
import MessageSender from "./MessageSender";
import Post from "./Post";
import db from "./firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);
  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      <FlipMove>
        {posts.map(({ id, post }) => (
          <Post
            id = {id}
            key={id}
            profilePic={post.profilePic}
            image={post.image}
            username={post.username}
            timestamp={post.timestamp}
            message={post.message}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;