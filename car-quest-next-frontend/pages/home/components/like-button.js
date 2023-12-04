import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { backendAuth } from '../../../axios/instance/BaseAxios';

const socket = io('http://localhost:8080');

const LikeButton = ({ postId }) => {
	// @ts-ignore
	const userId = useSelector((state) => state.user.userDetails.id);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const fetchLikedStatus = async (postId, userId) => {
			await backendAuth({
				url: `http://127.0.0.1:8080/api/likedStatus/${postId}?userId=${userId}`,
				method: 'GET',
			})
				.then((response) => {
					if (response.data.liked) {
						setLiked(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchLikedStatus(postId, userId);

		socket.on('like', ({ likedPostId, likedUserId, liked }) => {
			if (likedPostId === postId && likedUserId === userId) {
				setLiked(liked);
			}
		});

		// Cleanup the socket event listener on component unmount
		return () => {
			socket.off('like');
		};
	}, [postId, userId]);

	const handleLike = () => {
		socket.emit('like', { postId, userId });
	};

	return (
		<IconButton
			onClick={handleLike}
			style={{ color: liked ? 'red' : 'inherit' }}
		>
			<FavoriteIcon />
		</IconButton>
	);
};

export default LikeButton;
