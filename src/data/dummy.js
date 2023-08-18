import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';



export const links = [
  {
    title: '',
    links: [
      {
        name: 'dashboard',
        icon: <DashboardIcon />,
      },
    ],
  },

  {
    title: '',
    links: [
      
      {
        name: 'add a post',
        icon: <PostAddIcon />,
      },
      {
        name: 'manage posts',
        icon: <EditIcon />,
      },
      {
        name: 'users',
        icon: <PeopleOutlineIcon />,
      },
      {
        name: 'likes',
        icon: <ThumbUpIcon />,
      },
      {
        name: 'comments',
        icon: <CommentIcon />,
      },
    ],
  }
];
export const siteLinks = [
   
    {
      title:'',
    links: [
      {
        name: 'latest',
      },
      {
        name: 'politics',
      },
      {
        name: 'news',
      },
      {
        name: 'music',
      },
      {
        name: 'entertainment',
      },
      {
        name: 'viral',
      },
      {
        name: 'education',
      },
      {
        name: 'trending',
      },
    ],
  }
]
export const postLinks = ['trending', 'politics','news','music','entertainment','viral','education','latest']




