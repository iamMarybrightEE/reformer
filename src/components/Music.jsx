import { useStateContext } from '../contexts/ContextProvider';
import {getDocs, collection, query, orderBy} from 'firebase/firestore';
import { db } from '../data/firebase-config';
import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';
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
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};
const Music = () => {
 const { music, setMusic} = useStateContext();
   useEffect(() => {
        getMusicPost()
  }, []);
   const musicsPostCollection = collection(db, "music");
   const getMusicPost = async () => {
    const q = query(musicsPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setMusic(docs);
  };  
  return (
    <div className="mt-8  w-full p-4">
      {!(music) && [1,2,3,4,5].map((n) => <SkeletonArticle key={n} theme="light" />)}
               {music && <>
        <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {music[0].file && <img src={music[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={music[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md '}>  music</div>
            </div>
            <div className="text-justify">
                <Link to={music[0].title.toString()} className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{music[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(music[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: music[0].description }}  />
                <div className="w-full mt-8"><Link to={music[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#4432cd] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
        </>}
               {music && <div className=" mt-16 pb-4 w-full  dark:text-gray-200  ">
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '> Also Read</motion.div>
      {music.filter((item,i) => (i !== 0 )).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className="text-justify dark:text-white overflow-hidden w-full m-4 ">
                    <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className="sm:flex gap-4 ">
                      <div className=" relative">
                        {item.file && <img src={item.file} alt="" className='w-full rounded-2xl  sm:w-[200px] h-[230px] shadow-sm' />}
                        <div className={item.file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md'}>  music</div>
                      </div>
                      <div className={item.file == null ? "ml-[-4]":"w-full sm:w-[70%] "}>
                         <Link to={item.title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{item.title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[60px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                                         <div className="w-full my-8"><Link to={item.title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#4432cd] text-center w-full font-bold p-4 mb-16">Read more</Link></div>
                        
                      </div>
                    </motion.div>
                  </Link>
                  </>
                ))}</div>}
              </div>
  )
}
export default Music