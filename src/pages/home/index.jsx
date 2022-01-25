import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { CreateTweet } from "../../components/createTweet";
import { Modal } from "../../components/modal";
import { TweetCard } from "../../components/tweetCard";
import { getTweet, addLike, reTweet } from "../../services/tweet.service";
import { ADD_ACTIVE_TWEET } from "../../store/action.types";
import { Context } from "../../store/store";

import styles from "./home.module.css";

export const Home = ({ isAuth }) => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Context);

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getTweet().then((data) => {
      data.tweet.map(item => {
        if (item.asset) {
          let base64 = item.asset;
          let buffer=Uint8Array.from(atob(base64), c => c.charCodeAt(0));
          let blob=new Blob([buffer], { type: "image/jpg" });
          let url=URL.createObjectURL(blob);
          item.asset = url
        }
      })
      setTweets(data.tweet);
    });
  }, []);

  const onTweetClick = (tweetId) => {
    navigate(`/viewTweet/${tweetId}`);
    dispatch({
      type: ADD_ACTIVE_TWEET,
      payload: tweetId,
    });
  };

  const onSignInClick = () => {
    navigate("/signin");
  };

  const onSignUpClick = () => {
    navigate("/signup");
  };

  const onLike = (tweetId) => {
    addLike({
      tweetId: tweetId
    }).then(data => console.log(data))
  }

  const retweet = (tweetId) => {
    reTweet({
      tweetId: tweetId
    }).then(data => console.log(data))
  }

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.pageHead}>Home</div>
        {isAuth ? (
          <div>
            <CreateTweet />
          </div>
        ) : (
          <div className={styles.signInButton}>
            <Button onClick={onSignInClick}>Sign In</Button>
            <Button onClick={onSignUpClick}>Sign Up</Button>
          </div>
        )}

        <div>
          {tweets.map((tweet, index) => (
            <TweetCard
              userName={tweet.userName}
              tweetMsg={tweet.name}
              commentLength={tweet.commentIds.length}
              likeLength={tweet.like.length}
              // retweetCount={tweet.retweet.length}
              profilePic={tweet.profilePic}
              onTweetClick={() => onTweetClick(tweet._id)}
              onLike={() => onLike(tweet._id)}
              onRetweet={() => retweet(tweet._id)}
              tweetAsset={tweet.asset}
              key={tweet._id}
              tweet={tweet}
              isTweet={true}
            />
          ))}
        </div>
      </div>
      <Modal>
        <CreateTweet isTweet={true}/>
      </Modal>
    </>
  );
};
