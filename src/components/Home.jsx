import {getDocs, collection, query, orderBy} from 'firebase/firestore';
import { db } from '../data/firebase-config';
import { Link} from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect} from 'react';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import moment from 'moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircleIcon from '@mui/icons-material/Circle';
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
const Home = () => {
    const {trends, setTrends, viral, setViral, education, setEducation,entertainment, setEntertainment, politics, setPolitics, latest, setLatest, news, setNews, music, setMusic } = useStateContext();
   useEffect(() => {
    getTrendingPost()
    getNewsPost()
    getPoliticsPost()
    getMusicPost()
    getEntertainmentPost()
    getViralPost()
    getEducationPost()
    getLatestPost()   
  }, []);
const trendingPostCollection = collection(db, "trending");
   const getTrendingPost = async () => {
   const q = query(trendingPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setTrends(docs);
  };
   const newsPostCollection = collection(db, "news");
   const getNewsPost = async () => {
    const q = query(newsPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setNews(docs);
  };
   const politicsPostCollection = collection(db, "politics");
   const getPoliticsPost = async () => {
    const q = query(politicsPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPolitics(docs);
  };
   const musicPostCollection = collection(db, "music");
   const getMusicPost = async () => {
    const q = query(musicPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setMusic(docs);
  };
   const entertainmentPostCollection = collection(db, "entertainment");
   const getEntertainmentPost = async () => {
    const q = query(entertainmentPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setEntertainment(docs);
  };
   const viralPostCollection = collection(db, "viral");
   const getViralPost = async () => {
    const q = query(viralPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setViral(docs);
  };
   const educationPostCollection = collection(db, "education");
   const getEducationPost = async () => {
    const q = query(educationPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setEducation(docs);
  };
  const latestPostCollection = collection(db, "latest");
   const getLatestPost = async () => {
    const q = query(latestPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setLatest(docs);
  };
  return (
    <>
    <div className="mt-8   w-full p-4">
        
      {!(trends, politics, news, music, entertainment, viral, education, latest) && [1,2,3,4,5].map((n) => <SkeletonArticle key={n} theme="light" />)}      
      {trends && <>
       
          <motion.div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
            <div className="mt-4 relative ">
              {trends[0].file && <img src={trends[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={trends[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#cd323f]  text-white w-[max-content] rounded-md '}>  Trending</div>
            </div>
            <div className="text-justify">
                <Link to={trends[0].title.toString()} className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{trends[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(trends[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: trends[0].description }}  />
                <div className="w-full mt-8"><Link to={trends[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#cd323f] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
       
        </>}
      {trends && <div className=" mt-16 pb-4 ">
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</motion.div>
        {trends.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <motion.div className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"
                         variants={containerVariants}
                          initial="hide"
                          animate="show"
                          exit="exit"> <CircleIcon/> {item.title}</motion.div>
                  </Link>
                  </>
                ))}</div>}       
      {politics &&     <div className=" mt-16 pb-4 w-full    ">
        <Link to="/politics" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Politics</Link>
        
      {politics.filter((item,i) => (i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className="text-justify dark:text-white overflow-hidden w-full m-4 ">
                    <motion.div className="sm:flex gap-4 "
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                      <div className=" relative">
                        {item.file && <img src={item.file} alt="" className='w-full rounded-2xl  sm:w-[200px] h-[200px] shadow-sm' />}
                        <div className={item.file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#cdcd32]  text-white w-[max-content] rounded-md'}>  Politics</div>
                      </div>
                      <div className={item.file == null ? "ml-[-4]":"w-full sm:w-[70%] "}>
                         <Link to={item.title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{item.title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>                        
                      </div>
                    </motion.div>
                  </Link>
                  </>
                ))}</div>}
      {news && <>
        <Link to="/news" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>News</Link>
        
        <motion.div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative "
        variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
            <div className="mt-4 relative ">
              {news[0].file && <img src={news[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={news[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#269b26]  text-white w-[max-content] rounded-md '}>  News</div>
            </div>
            <div className="text-justify">
                <Link to={news[0].title.toString()} className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{news[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(news[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: news[0].description }}  />
                <div className="w-full mt-8"><Link to={news[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#269b26] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
        </>}
      {news && <div className=" mt-16 pb-4 w-full  dark:text-gray-200  ">
      {news.filter((item,i) => (i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className="text-justify dark:text-white overflow-hidden w-full m-4 ">
                    <motion.div className="sm:flex gap-4 "
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit">
                      <div className=" relative">
                        {item.file && <img src={item.file} alt="" className='w-full rounded-2xl  sm:w-[200px] h-[200px] shadow-sm' />}
                        <div className={item.file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#269b26]  text-white w-[max-content] rounded-md'}>  News</div>
                      </div>
                      <div className={item.file == null ? "ml-[-4]":"w-full sm:w-[70%] "}>
                         <Link to={item.title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{item.title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        
                      </div>
                    </motion.div>
                  </Link>
                  </>
                ))}</div>}
      {music && <> 
        <Link to="/music" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Music</Link>
       <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit" className="sm:flex gap-4 flex-wrap">

        <div className='sm:w-[50%]'>
        <>
        <div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {music[0].file && <img src={music[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={music[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md '}>  Music</div>
            </div>
            <div className="text-justify">
                <Link to={music[0].title.toString()} className="text-xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{music[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(music[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: music[0].description }}  />
                <div className="w-full mt-8"><Link to={music[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#4432cd] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </div>
        </>
        </div>
        <div className="sm:w-[45%]    text-justify  ">
      {music.filter((item,i) => (i !== 0 && i < 3 )).map((item) => (
                 <>
                  <Link  to={item.title.toString()} key={item.id} className="text-justify dark:text-white overflow-hidden w-full m-4 ">
                    <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className="sm:flex gap-4 ">
                      <div className=" relative">
                        {item.file && <img src={item.file} alt="" className='w-full rounded-2xl sm:w-[200px] h-[200px] shadow-sm' />}
                        <div className={item.file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md'}>  Music</div>
                      </div>
                      <div className={item.file == null ? "ml-[-4]":"w-full sm:w-[70%] "}>
                         <Link to={item.title.toString()} className="text-xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{item.title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        
                      </div>
                    </motion.div>
                  </Link>
                  </>
                ))}</div>
      </motion.div> </>}
      {entertainment && <div className=" mt-16 pb-4 w-full  dark:text-gray-200  ">
                <Link to="/entertainment" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Entertainment</Link>
      {entertainment.map((item) => (
                  <>
                <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit"  to={item.title.toString()} key={item.id} className=" overflow-hidden  dark:text-gray-200  w-full  ">
                    <Link to={item.title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{item.title}</Link>
                    <div className="flex gap-4 ">
                      <div className="w-[55%]">
                      <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                         <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                                         <div className="w-full my-8"><Link to={item.title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#cd323f] text-center w-full font-bold p-4 mb-16">Read more</Link></div>
                <div/>
                      </div>
                      <div className={item.file == null ? "":"w-[40%] h-[150px] rounded-2xl mt-2"}>
                        <img src={item.file} alt="" className='w-full h-full object cover shadow-sm' />
                      </div>
                    </div>
                  </motion.div>
                  </>
                ))}</div>}
        {viral && <div className="sm:flex gap-4 flex-wrap">
        <div className='sm:w-[45%]'>
        {viral && <>
        <Link to="/viral" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Viral</Link>
        <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {viral[0].file && <img src={viral[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={viral[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#cdcd32]  text-white w-[max-content] rounded-md '}>  Viral</div>
            </div>
            <div className="text-justify">
                <Link to={viral[0].title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{viral[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(viral[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: viral[0].description }}  />
                <div className="w-full mt-8"><Link to={viral[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#cdcd32] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
        </>}
      {viral && <div className=" mt-16 pb-4 ">
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit"  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</motion.div>
        {viral.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"> <CircleIcon/> {item.title}</motion.div>
                  </Link>
                  </>
                ))}</div>}
        </div>
        <div className="sm:w-[45%]  dark:text-gray-200  ">
      {education && <>
      <Link to="/education" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Education</Link>
        <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {education[0].file && <img src={education[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={education[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#269b26]    text-white w-[max-content] rounded-md '}>  Education</div>
            </div>
            <div className="text-justify">
                <Link to={education[0].title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{education[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(education[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: education[0].description }}  />
                <div className="w-full mt-8"><Link to={education[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#269b26] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
        </>}
      {education && <div className=" mt-16 pb-4 ">
        <div  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</div>
        {education.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"> <CircleIcon/> {item.title}</motion.div>
                  </Link>
                  </>
                ))}</div>}</div>
        <div className="w-full dark:text-gray-200  ">
    {latest && <>
    <Link to="/latest" className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Latest</Link>
       <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"  className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {latest[0].file && <img src={latest[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={latest[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md '}>  Latest</div>
            </div>
            <div className="text-justify">
                <Link to={latest[0].title.toString()} className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{latest[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(latest[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: latest[0].description }}  />
                <div className="w-full mt-8"><Link to={latest[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#4432cd] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </motion.div>
        </>}
      {latest && <div className=" mt-16 pb-4 ">
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit"  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</motion.div>
        {latest.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"> <CircleIcon/> {item.title}</motion.div>
                  </Link>
                  </>
                ))}</div>}</div>
      </div> }
    </div>
    </>
     )
}
export default Home;