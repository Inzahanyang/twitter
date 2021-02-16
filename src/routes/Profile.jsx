import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  // const [tweetList, setTweetList] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || ""
  );

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  // const getMytweets = async () => {
  //   const tweets = await dbService
  //     .collection("tweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();
  //   const changed = tweets.docs.map((doc) => ({
  //     ...doc.data(),
  //   }));
  //   setTweetList(changed);
  // };

  // useEffect(() => {
  //   getMytweets();
  // }, [tweetList, setTweetList]);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      {/* {tweetList &&
        tweetList.map((tweet) => (
          <div key={tweet.createdAt} style={{ marginTop: "30px" }}>
            {tweet.text}
          </div>
        ))} */}
    </div>
  );
};
