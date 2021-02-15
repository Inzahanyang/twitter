import { Tweet } from 'components/Tweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

export const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection('tweets').onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection('tweets').add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet('');
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setTweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};