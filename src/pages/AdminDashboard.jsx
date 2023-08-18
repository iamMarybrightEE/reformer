import React, { useEffect, useState} from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Navbar, Footer, Sidebar, ThemeSettings , Header} from '../components';
import DataTable from '../components/Charts/DataTable';
import LikesDataTable from '../components/Charts/LikesDataTable';
import CommentsDataTable from '../components/Charts/CommentsDataTable';
import UsersDataTable from '../components/Charts/UsersDataTable';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { motion } from 'framer-motion';

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
      yoyo: 5
    }
  }
}

const containerVariants = {
  hidden: { 
    opacity: 0, 
    x:"-100vw"
  },
  visible: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 },
    x:0
  },
  hide: { 
    opacity: 0, 
    x:"100vw"
  },
  show: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 },
    x:0
  },
  down: { 
    opacity: 0, 
    y:"100vh"
  },
  up: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 },
    y:0
  },
  high: { 
    opacity: 0, 
    y:"-100vh"
  },
  low: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 },
    y:0
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};

const AdminDashboard = () => {
   const {  setCurrentMode, currentMode, activeMenu} = useStateContext();
  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  
  }, []);
  

  const [post, setPost] = useState(true)
  const [likesList, setLikesList] = useState(false)
  const [commentsList, setCommentsList] = useState(false)
  const [usersList, setUsersList] = useState(false)

  const widgetData = [
  {
    icon: <NoteAddIcon/>,
    amount: '39,354',
    title: 'posts',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
    click: function () {
        setPost(true)
        setLikesList(false)
        setUsersList(false)
        setCommentsList(false)
    }
  },
  {
    icon: <PeopleOutlineIcon />,
    amount: '4,396',
    title: 'users',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
    click: function () {
        setPost(false)
        setLikesList(false)
        setUsersList(true)
        setCommentsList(false)
    }
  },
  {
    icon: <CommentIcon />,
    amount: '39,354',
    title: 'comments',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
    click: function () {
        setPost(false)
        setLikesList(false)
        setUsersList(false)
        setCommentsList(true)
    }
  },
  {
    icon: <ThumbUpIcon />,
    amount: '423,39',
    title: 'likes',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
    click: function () {
        setPost(false)
        setLikesList(true)
        setUsersList(false)
        setCommentsList(false)
    }
  },
  
];
  return (
    <div className="">
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
        <div className="flex relative dark:bg-main-dark-bg w-[100vw]">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg ">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full lg:min-w-[70vw]  '
                : 'bg-main-bg dark:bg-main-dark-bg   min-h-screen flex-2 w-[100vw]'
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            
           <div className="flex flex-wrap lg:flex-nowrap justify-center mt-8">
              <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className="flex m-3 flex-wrap justify-center sm:justify-evenly gap-4 items-center  w-full pt-16 md:pt-0">
                {widgetData.map((item) => (
                  <div onClick={item.click} key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg w-[70%] sm:w-[40%] md:w-[20%]  p-4 pt-9 rounded-2xl shadow-lg transition-all  hover:cursor-pointer">
                    <button
                      type="button"
                      style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                      className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <p className="mt-3">
                      <span className="text-lg font-semibold capitalize">{item.title}</span>
                    </p>
                    
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='w-full p-8 m-3'>
            {post && (<Header title="Posts"/>)}
            {likesList && (<Header title="Likes"/>)}
            {commentsList && (<Header title="Comments"/>)}
            {usersList && (<Header title="Users"/>)}
           {post && (<DataTable />)}
           {likesList && (<LikesDataTable />)}
           {commentsList && (<CommentsDataTable />)}
           {usersList && (<UsersDataTable />)}
           
        
        </motion.div>
            <Footer />
          </div>
        </div>
    </div>
    </div>
  );

 
};
     

export default AdminDashboard;
