import { cookies } from "./auth.service";
import { API, IS_MOCK } from "./base";

export const getTweet = (tweetId) => {
  const tweet = tweetId ? tweetId : ''
  return fetch(
    `${API}/tweet/get-tweet?tweetId=${tweet}`,
    {
      method: "GET",
    }
  ).then((data) => data.json());
};
//9487020871

export const uploadImage = (formData) => {
  return fetch(`${API}/upload/image`, {
    method: "POST",
    headers: {
      authtoken: cookies.get("authtoken"),
    },
    body: formData,
  }).then((data) => {
    return data.json();
  });
};

export const newTweet = (data) => {
  return fetch(`${API}/tweet/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authtoken: cookies.get("authtoken"),
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

export const addLike = (data) => {
  return fetch(`${API}/tweet/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authtoken: cookies.get("authtoken"),
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

export const reTweet = (data) => {
  return fetch(`${API}/tweet/retweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authtoken: cookies.get("authtoken"),
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export const getUserTweet = () => {
  return fetch(
    `${API}/tweet/get-user-tweet?user=me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'authtoken': cookies.get('authtoken')
      }
      
    }
  ).then((data) => data.json());
}
