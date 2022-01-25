import React, { useState } from "react";

import styles from "./base.module.css";

import { ReactComponent as HomeIcon } from "../../assets/baseAsset/home.svg";
import { ReactComponent as NotificationIcon } from "../../assets/baseAsset/notification.svg";
import { ReactComponent as ProfileIcon } from "../../assets/baseAsset/profile.svg";
import { ReactComponent as TwitterIcon } from "../../assets/baseAsset/twitter.svg";
import { Button } from "../button";
import { Modal } from "../modal";
import { CreateTweet } from "../createTweet";
import { newTweet, uploadImage } from "../../services/tweet.service";

export const Base = ({ children, onTweet, onNavClick }) => {
  return (
    <div className={styles.baseContainer}>
      <div className={styles.baseNav}>
        <Nav onNavClick={onNavClick} onTweet={onTweet} />
      </div>
      <div className={styles.baseBody}>{children}</div>
      <div className={styles.baseOther}>
        <Others />
      </div>
    </div>
  );
};

const Nav = ({ onNavClick }) => {
  const [isNewTweet, setIsNewTweet] = useState(false);

  const onTweet = () => {
    setIsNewTweet(true);
  };

  const onNewTweetClose = () => {
    setIsNewTweet(false);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navContent}>
        <div onClick={() => onNavClick("/")}>
          <div className={styles.twitterIcon}>
            <TwitterIcon className={styles.twitterLogo} />
          </div>
        </div>
        <div onClick={() => onNavClick("/")}>
          <div>
            <span>
              <HomeIcon />
            </span>
            <span>Home</span>
          </div>
        </div>

        <div onClick={() => onNavClick("/profile")}>
          <div>
            <span>
              <ProfileIcon />
            </span>
            <span>Profile</span>
          </div>
        </div>
        <div className={styles.tweetButtonContainer}>
          <div className={styles.tweetButton}>
            <Button>
              <div onClick={onTweet} className={styles.tweetButtonChild}>
                Tweet
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Modal onClose={onNewTweetClose} enable={isNewTweet}>
        <CreateTweet />
      </Modal>
    </div>
  );
};

const Others = () => {
  return (
    <div className={styles.othersContaienr}>
      <div className={styles.othersHead}>Whats Happening</div>
      <div className={styles.tweet}>
        <div className={styles.userName}>Jenifer Singh</div>
        <div className={styles.message}>
          Facebook bought whatsapp, to improve their buisness
        </div>
      </div>
      <div className={styles.tweet}>
        <div className={styles.userName}>Manchester</div>
        <div className={styles.message}>
          Making a country better is what human being is for. To make the life
          better
        </div>
      </div>
      <div className={styles.othersFooter} />
    </div>
  );
};
