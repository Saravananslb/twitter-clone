import React, { useState } from "react";
import { Button } from "../button";

import styles from "./createTweet.module.css";

import { ReactComponent as ImageIcon } from "../../assets/createTweet/image.svg";
import { ReactComponent as SmileIcon } from "../../assets/createTweet/smile.svg";
import { ReactComponent as AvatarIcon } from "../../assets/profile/profileAvatar.svg";
import { newTweet, uploadImage } from "../../services/tweet.service";
import { AddComment } from "../../services/comment.service";
import { useParams } from "react-router-dom";

export const CreateTweet = ({ placeholder = "What's Happening", isTweet, selectedTweet }) => {
  const { tweetId } = useParams();
  console.log(isTweet)
  const [uploadedData, setUplodedData] = useState("");

  const [formData, setFormData] = useState("");

  const [tweetMsg, setTweetMsg] = useState("");

  function openFileDialog(accept, callback) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", callback);
    inputElement.dispatchEvent(new MouseEvent("click"));
  }

  const onFileChange = (e) => {
    let file = e.path[0].files[0];
    setUplodedData(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('image', file);
    setFormData(formData);
  };

  const onUploadedImageClose = () => {
    setUplodedData("");
    setFormData("");
  };

  const handleTweetChange = (e) => {
    setTweetMsg(e.target.value);
  };

  const onTweet = async(file, tweetMsg) => {
    console.log(isTweet, selectedTweet);
    let upload;
    if (formData) {
      upload = await uploadImage(formData).then((data) => {
        return data;
      });
    }
    if (isTweet == undefined){
      const createdTweet = await newTweet({
        name: tweetMsg,
        asset: upload ? upload.image : '',
      }).then(data => {
        console.log(data);
        setTweetMsg('');
      });
    }
    else {
      const createdComment = await AddComment({
        tweetId: tweetId,
        name: tweetMsg,
        asset: upload ? upload.image : '',
      }).then(data => {
        console.log(data)
        setTweetMsg('');
      });
    }
  };

  return (
    <div className={styles.createTweetContainer}>
      <div className={styles.profileCont}>
        <div>
          <AvatarIcon />
        </div>
      </div>
      <div className={styles.dataCont}>
        <div className={styles.createTweetInputCont}>
          <input
            value={tweetMsg}
            onChange={handleTweetChange}
            className={styles.newTweetInput}
            type="text"
            placeholder={placeholder}
          />
        </div>
        {uploadedData && (
          <div className={styles.uploadedDataCont}>
            <div
              onClick={onUploadedImageClose}
              className={styles.uploadedImageCancel}
            >
              X
            </div>
            <img className={styles.uploadedImg} src={uploadedData} alt="" />
          </div>
        )}

        <div className={styles.footer}>
          <div
            className={styles.iconContainer}
            onClick={() => openFileDialog(".svg,.png,.jpg,.jpeg", onFileChange)}
          >
            <ImageIcon />
          </div>
          <div className={styles.iconContainer}>
            <SmileIcon />
          </div>
          <div className={styles.empty} />
          <div className={styles.tweetButton}>
            <Button
              onClick={() => onTweet(uploadedData, tweetMsg)}
              disabled={!(uploadedData || tweetMsg)}
            >
              Tweet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
