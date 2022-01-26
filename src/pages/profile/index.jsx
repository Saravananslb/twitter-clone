import React, { useContext, useEffect, useState } from "react";
import { TweetCard } from "../../components/tweetCard";

import styles from "./profile.module.css";

import { ReactComponent as BackArrow } from "../../assets/common/backArrow.svg";
import { ImageOverlay } from "../../components/imageOverlay";
import { getUser } from "../../services/user.services";
import { getUserTweet, addLike, reTweet } from '../../services/tweet.service';
import { Context } from "../../store/store";
import { ADD_ACTIVE_TWEET } from "../../store/action.types";
import { useNavigate } from "react-router-dom";
import {ReactComponent as EditIcon} from '../../assets/edit-icon.svg';

export const Profile = () => {
  const [viewImage, setViewImage] = useState(false);

  const [user, setUser] = useState({});

  const [tweet, setTweet] = useState([]);

  const [uploadedData, setUplodedData] = useState("");

  const [formData, setFormData] = useState("");

  const [overlayImage, setOverlayImage] = useState("");

  const { state, dispatch } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    getAlldetails();
  }, []);

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

  const getAlldetails = () => {
    getUser().then((data) => {
      console.log(data.users[0])
      setUser(data.users[0]);
    });
    getUserTweet().then(data => {
      console.log(data)
      setTweet(data)
    })
  }

  const onViewImage = (image) => {
    setViewImage(true);
    setOverlayImage(image);
  };

  const onCloseImage = () => {
    setViewImage(false);
  };

  const onTweetClick = (tweetId) => {
    dispatch({
      type: ADD_ACTIVE_TWEET,
      payload: tweetId,
    });
    navigate(`/viewTweet/${tweetId}`);
  };

  const goBack = () => {
    navigate(-1);
  };

  const onLike = (tweetId) => {
    addLike({
      tweetId: tweetId
    }).then(data => getAlldetails())
  }

  const retweet = (tweetId) => {
    reTweet({
      tweetId: tweetId
    }).then(data => getAlldetails())
  }

  return (
    <>
    {user ? 
      (<><div className={styles.profileContainer}>
          <div className={styles.pageHeadContainer}>
            <span
              onClick={goBack}
              className={`${styles.iconContainer} ${styles.backArrow}`}
            >
              <BackArrow />
            </span>
            <span className={styles.pageName}>{user.userName}</span>
          </div>
          <div
            className={styles.profileBackground}
            onClick={() => onViewImage(user.backgroundImage)}
          >
            <img className={styles.profileBg} src={user.backgroundImage} alt="" />
          </div>
          <div
            
            className={styles.profilePic}
            style={{ border: '2px', background:'#c8b9b9'}}
            onClick={() => onViewImage(user.profilePic)}
          >
            <img className={styles.profileImg} src={user.profilePic} alt="" />
            <img src={EditIcon} />
          </div>

          <div className={styles.userName}>{user.name}</div>
          <div className={styles.followBox}>
            <div>
              <span className={styles.followNumber}>{user.following ? user.following.length : 0}</span>
              <span>Following</span>
            </div>
            <div>
              <span className={styles.followNumber}>{user.followers ? user.followers.length : 0}</span>
              <span>Followers</span>
            </div>
          </div>
          <div className={styles.profileTweetHead}>Tweets</div>
          <div>
            {tweet.tweet?.map((value) => (
              <TweetCard
                userName={value.userName}
                tweetMsg={value.name}
                commentLength={value.commentIds?.length}
                likeLength={value.like?.length}
                retweetCount={value.retweet?.length}
                profilePic={value.profilePic}
                onTweetClick={() => onTweetClick(value._id)}
                onLike={() => onLike(value._id)}
                onRetweet={()=> retweet(value._id)}
                tweetAsset={value.asset}
                key={value._id} 
                isLiked={value.isLiked}/>
            ))}
          </div>
        </div><ImageOverlay onClose={onCloseImage} enable={viewImage} style={{cursor: 'pointer'}} >
        <span style={{background: 'blue', cursor: 'pointer'}} onClick={() => openFileDialog(".svg,.png,.jpg,.jpeg", onFileChange)}>Edit</span>
            <img className style={{cursor: 'pointer'}} src={overlayImage} alt="" />
          </ImageOverlay></>) : null}
    </>
  );
};
