// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
	ChromeOutlined,
	QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
	id: 'support',
	title: 'Support',
	type: 'group',
	children: [
		{
			id: 'sample-page',
			title: 'Add Post',
			type: 'item',
			url: '/sample-page',
			icon: icons.ChromeOutlined,
		},
	],
};

export default support;
