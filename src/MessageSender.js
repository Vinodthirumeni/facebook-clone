import React, { useState } from "react";
import "./MessageSender.css";
import Avatar from "@material-ui/core/Avatar";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useStateValue } from "./StateProvider"; // CONTEXT API
import db from "./firebase";
import firebase from "firebase";
import { storage } from "./firebase";
function MessageSender() {
  const [{ user }, dispatch] = useStateValue(); // CONTEXT API this can be used any whare for user params
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              image: url,
              message: input,
              profilePic: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: user.displayName,
            });
            setProgress(0);
            setImage(null);
          });
      }
    );
    // db.collection("rooms").doc(roomId).collection("messages").add({
    //   user: user.displayName,
    //   message: input,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    // setInput("");
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   db.collection("posts").add({
  //     image: imageUrl,
  //     message: input,
  //     profilePic: user.photoURL,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     username: user.displayName,
  //   });
  //   setInput("");
  //   setImageUrl("");
  // };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender__input"
            placeholder={`Whats on your mind ${user.displayName}?`}
          />
          <input type="file" onChange={handleChange} />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSender__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSender__option">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video</h3>
        </div>
        <div className="messageSender__option">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
    </div>
  );
}
export default MessageSender;
