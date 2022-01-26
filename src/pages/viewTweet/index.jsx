import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as BackArrow } from "../../assets/common/backArrow.svg";
import { CreateTweet } from "../../components/createTweet";

import styles from "./newTweet.module.css";

import { ReactComponent as CommentIcon } from "../../assets/tweetCard/comment.svg";
import { ReactComponent as LikeIcon } from "../../assets/tweetCard/like.svg";
import { TweetCard } from "../../components/tweetCard";

import TestTweetImg2 from "../../assets/test/testTweetImg2.jpeg";
import { ImageOverlay } from "../../components/imageOverlay";
import { Context } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_ACTIVE_TWEET } from "../../store/action.types";
import { getTweet, getTweetComment } from "../../services/tweet.service";

export const ViewTweet = () => {
  const [viewImage, setViewImage] = useState(false);

  const [tweet, setTweet] = useState({});

  const { state, dispatch } = useContext(Context);

  const [comment, setComment] = useState([]);

  const navigate = useNavigate();

  const { activeTweet } = state;

  const { tweetId } = useParams();

  useEffect(() => {
    console.log(tweetId);
    // getTweet(activeTweet).then((data) => {
    //   setTweet(data);
    // });
    getTweetComment(tweetId).then(data => setComment(data.comment))
  }, []);

  const onViewImage = () => {
    setViewImage(true);
  };

  const onViewImageClose = () => {
    setViewImage(false);
  };

  const onTweetClick = (tweet) => {
    navigate("/viewTweet");
    dispatch({
      type: ADD_ACTIVE_TWEET,
      payload: tweet,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={styles.newTweetContainer}>
        <div className={styles.pageHeadContainer}>
          <span
            onClick={goBack}
            className={`${styles.iconContainer} ${styles.backArrow}`}
          >
            <BackArrow />
          </span>
          <span className={styles.pageName}>Tweet</span>
        </div>
        <div className={styles.tweetHead}>
          <div className={styles.tweetLogo}>
            <div className={styles.profileImg}>
              <img src={tweet.profilePic} alt="" />
            </div>
          </div>
          <div className={styles.tweetUserName}>{tweet.userName}</div>
        </div>
        <div className={styles.tweetMsg}>{tweet.name}</div>
        <div onClick={onViewImage} className={styles.imgContainer}>
          <img className={styles.tweetImg} src={tweet.asset} alt="" />
        </div>
        <div className={styles.likes}>
          <span className={styles.likeCount}>{tweet.like?.length}</span>
          <span className={styles.OptionName}>Likes</span>
        </div>
        <div>
          <div className={styles.tweetFooter}>
            <div>
              <span className={styles.iconContainer}>
                <CommentIcon />
              </span>
            </div>
            <div>
              <span className={styles.iconContainer}>
                <LikeIcon />
              </span>
            </div>
            <div>
              <span />
            </div>
            <div>
              <span />
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <Reply />
        </div>
        <div>
          {comment?.map((comment, index) => (
            <TweetCard
              userName={comment.userName}
              tweetMsg={comment.name}
              commentLength={comment.commentIds?.length}
              likeLength={comment.like?.length}
              retweetCount={comment.retweet?.length}
              profilePic={comment.profilePic}
              onTweetClick={() => onTweetClick(comment._id)}
              tweetAsset={comment.asset}
              key={comment._id}
              isTweet={false}
            />
          ))}
        </div>
      </div>

      <ImageOverlay enable={viewImage} onClose={onViewImageClose}>
        <img src={activeTweet.asset} alt="" />
      </ImageOverlay>
    </>
  );
};

const Reply = () => {
  return <CreateTweet placeholder="Tweet your reply" isTweet={false} />;
};
