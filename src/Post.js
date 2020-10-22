import React, { forwardRef, useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider"; // CONTEXT API

const Post = forwardRef(
  ({ id, profilePic, image, username, timestamp, message }, ref) => {
    const [{ user }, dispatch] = useStateValue(); // CONTEXT API this can be used any whare for user params

    const [retrivecomments, setRetrivecomments] = useState([]);
    const [postcomment, setPostcomment] = useState("");
    const deleteRoom = (e) => {
      e.preventDefault();
      if (id) {
        db.collection("posts").doc(id).delete();
      }
    };

    useEffect(() => {
      let unsubscribe;
      if (id) {
        unsubscribe = db
          .collection("posts")
          .doc(id)
          .collection("comments")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setRetrivecomments(snapshot.docs.map((doc) => doc.data()));
          });
      }

      return () => {
        unsubscribe();
      };
    }, [id]);

    const postComment = (event) => {
      event.preventDefault();

      db.collection("posts").doc(id).collection("comments").add({
        text: postcomment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setPostcomment("");
    };

    return (
      <div ref={ref} className="post">
        <div className="post__top">
          <Avatar src={profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>{username}</h3>
            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
          </div>
          <div className="post__delete">
            <DeleteOutlineIcon onClick={deleteRoom} />
          </div>
        </div>

        <div className="post__bottom">
          <p>{message}</p>
        </div>

        <div className="post__image">
          <img src={image} alt="" />
        </div>

        <div className="post__comments">
          {retrivecomments.map((comment) => (
            <p>
              <Avatar src={profilePic} className="" />
              <b>{comment.username} : </b>
              {comment.text}
            </p>
          ))}
        </div>

        {user && (
          <form className="post__commentBox">
            <input
              className="post__input"
              type="text"
              placeholder="Add Comment..."
              value={postcomment}
              onChange={(e) => setPostcomment(e.target.value)}
            />
            <button
              className="post__button"
              disabled={!postcomment}
              type="submit"
              onClick={postComment}
            >
              Comment
            </button>
          </form>
        )}

        <div className="post_options">
          <div className="post_option">
            <ThumbUpIcon />
            <p>Like</p>
          </div>

          <div className="post_option">
            <ChatBubbleOutlineIcon />
            <p>Comment</p>
          </div>

          <div className="post_option">
            <NearMeIcon />
            <p>Share</p>
          </div>

          <div className="post_option">
            <AccountCircleIcon />
            <ExpandMoreOutlinedIcon />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;