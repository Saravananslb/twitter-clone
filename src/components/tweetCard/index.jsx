import React, { useEffect, useState } from "react";

import styles from "./tweetCard.module.css";

import { ReactComponent as CommentIcon } from "../../assets/tweetCard/comment.svg";
import { ReactComponent as LikeIcon } from "../../assets/tweetCard/like.svg";
import { ReactComponent as Retweet } from "../../assets/tweetCard/retweet.svg";

import TestTweetImg1 from "../../assets/test/testTweetImg1.jpeg";
import TestTweetImg2 from "../../assets/test/testTweetImg2.jpeg";
import { ImageOverlay } from "../imageOverlay";
import { Modal } from "../modal";
import { CreateTweet } from "../createTweet";

export const TweetCard = ({
  tweet,
  onTweetClick,
  userName,
  tweetMsg,
  commentLength,
  likeLength,
  retweetCount,
  profilePic,
  tweetAsset,
  onLike,
  onRetweet,
  isLiked,
  isTweet = true,
}) => {
  const [viewImage, setViewImage] = useState(false);

  const [isComment, setIsComment] = useState(false);

  const [selectedTweet, setSelecetedTweet] = useState('');

  useEffect(() => {
    setSelecetedTweet(tweet)
  })

  const onViewImage = (e) => {
    e.stopPropagation();
    setViewImage(true);
  };

  const onViewImageClose = (e) => {
    setViewImage(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike();
  };

  const handleRetweet = (e) => {
    e.stopPropagation();
    onRetweet();
  };

  const onCommentClose = () => {
    setIsComment(false);
  };

  const onCommentOpen = (tweetId) => {
    // e.stopPropagation();
    setIsComment(true);
    setSelecetedTweet(tweetId);
  };

  return (
    <>
      <div onClick={onTweetClick} className={styles.tweetCardContainer}>
        <div className={styles.profileCont}>
          <div className={styles.profileImg}>
            <img src={profilePic} alt="" />
          </div>
        </div>
        <div className={styles.dataCont}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.msgContainer}>{tweetMsg}</div>
          {tweetAsset && (
            <div onClick={onViewImage} className={styles.imgContainer}>
              <img className={styles.tweetImg} src={tweetAsset} alt="" />
            </div>
          )}

          <div className={styles.footer}>
            <div>
              <div className={styles.iconContainer}>
                <span onClick={() => onCommentOpen(tweet._id)} className={styles.footerOpt}>
                  <CommentIcon />
                </span>

                <span>{commentLength}</span>
              </div>
            </div>
            <div>
              <div className={styles.iconContainer}>
                <span onClick={handleLike} className={styles.footerOpt}>
                  <LikeIcon style={isLiked ? {background: 'red'} : {}}/>
                </span>

                <span>{likeLength}</span>
              </div>
            </div>
            <div>
              <div className={styles.iconContainer}>
                <span onClick={handleRetweet} className={styles.footerOpt}>
                  <Retweet />
                </span>

                <span>{retweetCount}</span>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
      <ImageOverlay enable={viewImage} onClose={onViewImageClose}>
        <img src={tweetAsset} alt="" />
      </ImageOverlay>
      <Modal onClose={onCommentClose} enable={isComment}>
        <CreateTweet isTweet={false} selectedTweet={selectedTweet} />
      </Modal>
    </>
  );
};
