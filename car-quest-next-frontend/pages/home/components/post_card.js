import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LikeButton from './like-button';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function PostCard(props) {
	const { post, handleLike } = props;
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			sx={{
				maxWidth: 300,
			}}
		>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={post.postTitle}
				// subheader={post.postImageUrl}
			/>
			<CardMedia
				component='img'
				image={post.postImageUrl}
				alt='Paella dish'
				// height={40}
				style={{ height: '300px' }}
			/>
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{post.postDescription}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{/* <IconButton aria-label='add to favorites'> */}
				<LikeButton postId={post._id} />
				{/* <FavoriteIcon /> */}
				{/* </IconButton> */}
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>
						Heat 1/2 cup of the broth in a pot until simmering, add saffron and
						set aside for 10 minutes.
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
