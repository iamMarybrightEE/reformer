import  { useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Navbar, Footer, Sidebar,Header } from '../components';
import CommentsDataTable from '../components/Charts/CommentsDataTable';
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
    transition: { delay: 0.5, duration: 1.5 },
    x:0
  },
  hide: { 
    opacity: 0, 
    x:"100vw"
  },
  show: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    x:0
  },
  down: { 
    opacity: 0, 
    y:"100vh"
  },
  up: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    y:0
  },
  high: { 
    opacity: 0, 
    y:"-100vh"
  },
  low: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    y:0
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};


const Comments = () => {
  const { currentMode, activeMenu} = useStateContext();


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
             <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className='p-8 pb-0 dark:text-gray-200'>
              <Header title='Comments' className="dark:text-gray-200"/>
            </motion.div>
             <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='w-full p-8'>
              { <CommentsDataTable/>}
            </motion.div>
            <Footer />
          </div>
        </div>
    </div>
    </div>
  );
}

export default Comments