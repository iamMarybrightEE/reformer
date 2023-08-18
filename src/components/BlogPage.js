import React, {useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import {collection, getDocs,  query, where, addDoc, orderBy, serverTimestamp} from 'firebase/firestore';
import { db } from '../data/firebase-config';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SendIcon from '@mui/icons-material/Send';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import {  facebookProvider} from '../data/firebase-config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import { getAuth, signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment/moment';
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
const BlogPage = () => {
  const {  user, setUser,  alsoTrend, setAlsoTrend, alsoNews, setAlsoNews, alsoPolitics, setAlsoPolitics, comments, setComments } = useStateContext();
  const [dislikeactive, setDislikeActive] = useState(false);
  const [likeactive, setLikeActive] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [singleTrend, setSingleTrend] = useState("")
  const [singlePolitics, setSinglePolitics] = useState("")
  const [singleNews, setSingleNews] = useState("")
  const [singleMusic, setSingleMusic] = useState("")
  const [singleEntertainment, setSingleEntertainment] = useState("")
  const [singleViral, setSingleViral] = useState("")
  const [singleEducation, setSingleEducation] = useState("")
  const [singleLatest, setSingleLatest] = useState("")



    const auth = getAuth();
  const handleLikeClick = () => {
    setLikeActive(!likeactive);
    setDislikeActive(false)
    if(likeactive){
       const likeRef = collection(db, "likes")
      const addLike = async () => {
    try {
              addDoc(likeRef,{
              displayName,
              like: "liked",
              profilePicture,
              name: id,
              createdAt: serverTimestamp(),
            }).then(
              console.log("done")
            ).catch(err => alert(err.message))
          } catch (error) { throw error;}    
        }
        addLike()
    }
  };
  const handleDislikeClick = () => {
    setLikeActive(false);
    setDislikeActive(!dislikeactive)
    if(dislikeactive){
       const dislikeRef = collection(db, "dislikes")
      const addDislike = async () => {
    try {
              addDoc(dislikeRef,{
              displayName,
              like: "disliked",
              profilePicture,
              name: id,
              createdAt: serverTimestamp(),
            }).then(
              console.log("done")
            ).catch(err => alert(err.message))
          } catch (error) { throw error;}    
        }
        addDislike()
    }
  };
  const {id} = useParams();
    useEffect(() => {
    getSingleTrendingPost()
    getSingleEducationPost()
    getSinglePoliticsPost()
    getSingleMusicPost()
    getSingleEntertainmentPost()
    getSingleLatestPost()
    getSingleViralPost()
    getSingleNewsPost()
    getSinglePoliticsPost()
       getTrendingPost()
        getNewsPost()
        getPoliticsPost()
        getComments()
        
  }, []);

  const getSingleTrendingPost = async () => {  
      const q = query(collection(db, "trending"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleTrend(newData)
    }
  const getSingleEntertainmentPost = async () => {  
      const q = query(collection(db, "entertainment"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleEntertainment(newData)
    }
  const getSingleEducationPost = async () => {  
      const q = query(collection(db, "education"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleEducation(newData)
    }
  const getSingleMusicPost = async () => {  
      const q = query(collection(db, "music"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleMusic(newData)
    }
  const getSingleNewsPost = async () => {  
      const q = query(collection(db, "news"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleNews(newData)
    }
  const getSinglePoliticsPost = async () => {  
      const q = query(collection(db, "politics"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSinglePolitics(newData)
    }
  const getSingleViralPost = async () => {  
      const q = query(collection(db, "viral"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleViral(newData)
    }
  const getSingleLatestPost = async () => {  
      const q = query(collection(db, "latest"), where("id", "==", id));
const data = await getDocs(q);
  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return setSingleLatest(newData)
    }
 const commentCollection = collection(db, "comments");
   const getComments = async () => {
     const q = query(commentCollection,orderBy("createdAt", "desc"), where("name", "==", id));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setComments(docs);
  };
 const trendingPostCollection = collection(db, "trending");
   const getTrendingPost = async () => {
    const data = await getDocs(trendingPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setAlsoTrend(newData);
    
  };
   const newsPostCollection = collection(db, "news");
   const getNewsPost = async () => {
    const data = await getDocs(newsPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setAlsoNews(newData);
  };
   const politicsPostCollection = collection(db, "politics");
   const getPoliticsPost = async () => {
    const data = await getDocs(politicsPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setAlsoPolitics(newData);
  };
  const Login = () => {
    const signInWithFacebook =  () => {
        signInWithPopup(auth, facebookProvider).then((result)=>{
      setUser(result.user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      // fetch facebook graph api to get user actual profile picture
      fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
      .then((response)=>{        
        setDisplayName(result.user.displayName)
        setEmail(result.user.email)
        response.blob().then((blob)=>{
        setProfilePicture(URL.createObjectURL(blob));
        const addDetails = async () => {
            const postCollectionRef = collection(db, "users")
          try {            
              addDoc(postCollectionRef,{
              displayName,
              email,
              profilePicture,
              createdAt: serverTimestamp(),
            }).then(
              console.log("done")
            ).catch(err => alert(err.message))
          } catch (error) { throw error;}    
        }
        addDetails()
      })
        })     
    })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log(error)
  });
    }  
const [comment, setcomment] = useState('');
   const addComment = async (e) => {
   const commentRef = collection(db, "comments")  
    try {
       addDoc(commentRef,{
        body:comment,
        createdAt: serverTimestamp(),
        displayName,
              profilePicture,
              name:id
        
      }).then(()=>{
        setcomment('')
      }
      ).catch(err => alert(err.message))     
    } catch (error) { throw error;}    
  } 
  return (
    <div>
      {user?(
              <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit">
                <div className="mt-4 border-y-2 w-full flex justify-between gap-4 items-center">
                        <div onClick={() => {handleLikeClick()}} className="hover:bg-[rgba(0,0,0,0.1)]  text-center w-full font-bold p-2 hover:cursor-pointer rounded-md " style={{color: likeactive ? '#32cd32' : 'gray'}}> <ThumbUpIcon/> Like </div>
                        <div onClick={() => {handleDislikeClick()}} className="hover:bg-[rgba(0,0,0,0.1)]   text-center w-full font-bold p-2 hover:cursor-pointer rounded-md " style={{color: dislikeactive ? 'red' : 'gray'}}> <ThumbDownIcon/> Dislike </div>
                </div>
                <div  className='m-4 mx-0 mt-2 p-2  flex  gap-4 '>
                  <div className='photo '>
                    {profilePicture ? (<div className='w-[50px] h-[50px] rounded-[50%]'><img src={profilePicture} alt="dp" referrerPolicy='no-referrer' className='w-full h-full roundeed-[50%]'/></div>) : (<div className=' text-gray-400 text-right w-[10%] p-2'><AccountCircleIcon /></div>)}
                  </div>  
                   <input value={comment}  onChange={e => setcomment(e.target.value)}   className='p-2 mt-2 w-[80%] rounded-3xl  dark:bg-secondary-dark-bg outline-none dark:text-gray-200 bg-gray-200 h-[50px]'
                  />      
                  <button onClick={addComment} className='text-gray-400  text-right w-[10%] p-2'><SendIcon/></button>                  
                </div>
                <div className="">
                  {comments && <div className=" w-full pb-4 mt-2">{comments.filter((item,i) => (i < 3)).map((item) => (
                  <>
                  <div  key={item.id} className=" overflow-x-hidden w-full flex gap-4 mt-4 transition-all ">
                  {profilePicture ? (<div className='w-[50px] h-[50px] rounded-[50%]'><img src={profilePicture} alt="dp" referrerPolicy='no-referrer' className='w-full h-full roundeed-[50%]'/></div>) : (<div className=' text-gray-400 text-right w-[10%] p-2'><AccountCircleIcon /></div>)}
                  <div className="bg-gray-200 dark:bg-secondary-dark-bg p-2 rounded-xl">
                         <div className=" font-bold text-gray-800 dark:text-gray-300">{item.displayName}</div>
                         <div className="text-gray-700 text-md dark:text-gray-200">{item.body}</div>
                  </div>
                  </div>
                  </>
                ))}</div>}
                </div>                
              </motion.div>
            ):(
              <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit">
                <div className="mt-4 border-y-2 w-full flex justify-between gap-4 items-center">
                        <button onClick={signInWithFacebook} className="hover:bg-[rgba(0,0,0,0.1)] text-gray-500 dark:text-gray-300 text-center w-full font-bold p-2 hover:cursor-pointer rounded-md "> <ThumbUpIcon/> Like </button>
                        <button onClick={signInWithFacebook} className="hover:bg-[rgba(0,0,0,0.1)] text-gray-500 dark:text-gray-300   text-center w-full font-bold p-2 hover:cursor-pointer rounded-md "> <ThumbDownIcon/> Dislike </button>
                </div>
                <div  className='m-4 mx-0 mt-2 p-2  flex  gap-4 '>
                  <div className='photo '>
                    {profilePicture ? (<div className='w-[50px] h-[50px] rounded-[50%]'><img src={profilePicture} alt="dp" referrerPolicy='no-referrer' className='w-full h-full roundeed-[50%]'/></div>) : (<div className=' text-gray-400 text-right w-[10%] p-2'><AccountCircleIcon /></div>)}
                  </div>  
                   <input   onChange={signInWithFacebook}   className='p-2 mt-2 w-[80%] rounded-3xl  dark:bg-secondary-dark-bg outline-none dark:text-gray-200 bg-gray-200 h-[50px]'
                  />      
                  <button onClick={signInWithFacebook} className='text-gray-400  text-right w-[10%] p-2'><SendIcon/></button>                  
                </div>
                <div className="">
                  {comments && <div className=" w-full pb-4 mt-2">{comments.filter((item,i) => (i < 3)).map((item) => (
                  <>
                  <div  key={item.id} className=" overflow-x-hidden w-full flex gap-4 mt-4 transition-all ">
                  {profilePicture ? (<div className='w-[50px] h-[50px] rounded-[50%]'><img src={profilePicture} alt="dp" referrerPolicy='no-referrer' className='w-full h-full roundeed-[50%]'/></div>) : (<div className=' text-gray-400 text-right w-[10%] p-2'><AccountCircleIcon /></div>)}
                  <div className="bg-gray-200 dark:bg-secondary-dark-bg p-2 rounded-xl">
                         <div className=" font-bold text-gray-800 dark:text-gray-300">{item.displayName}</div>
                         <div className="text-gray-700 text-md dark:text-gray-200">{item.body}</div>
                  </div>
                  </div>
                  </>
                ))}</div>}
                </div>
              </motion.div>
           )} 
    </div>
  )
}
    return (
     <div className="flex  flex-wrap justify-center  sm:justify-evenly gap-8 items-center mt-8   w-full p-4">
                <>
                {!(alsoNews, alsoPolitics, alsoTrend,singleTrend,singleNews,singleMusic,singleNews,singlePolitics,singleEntertainment,singleEducation,singleViral) && [1,2].map((n) => <SkeletonArticle key={n} theme="light" />)}
                   {singleTrend && singleTrend.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                   {singleNews && singleNews.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                   {singleMusic && singleMusic.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                   {singleLatest && singleLatest.map((item) => (
                  <>
                 <div key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </div>
                  </>
                ))}
                   {singlePolitics && singlePolitics.map((item) => (
                  <>
                 <div key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </div>
                  </>
                ))}
                   {singleEntertainment && singleEntertainment.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                   {singleEducation && singleEducation.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                   {singleViral && singleViral.map((item) => (
                  <>
                  <motion.div variants={containerVariants}
          initial="high"
          animate="low"
          exit="exit" key={item.id} className="h-full overflow-hidden  text-xl">
                      <div className="">
                         <div className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white  title mt-4">{item.title}</div>
                <div className="text-md my-4 flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(item.createdAt.toDate()).calendar()}</span>
                </div>
                        {item.file && <img src={item.file} alt="" className=" rounded-2xl w-full  h-[300px] "/>}
                      </div>
                      <div className="w-full  truncate whitespace-normal body pt-4 pb-8 leading-10 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: item.description }}  />
                      <Login/>
    
                  </motion.div>
                  </>
                ))}
                {alsoTrend && <div className="sm:flex justify-between flex-wrap">
        <div className='sm:w-[45%]'>
        {alsoTrend && <>
        <div className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Trending</div>
        <div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {alsoTrend[0].file && <img src={alsoTrend[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={alsoTrend[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#cdcd32]  text-white w-[max-content] rounded-md '}>  Trending</div>
            </div>
            <div className="text-justify">
                <Link to={alsoTrend[0].title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{alsoTrend[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(alsoTrend[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: alsoTrend[0].description }}  />
                <div className="w-full mt-8"><Link to={alsoTrend[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#269b26] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </div>
        </>}
      {alsoTrend && <div className=" mt-16 pb-4 ">
        <div  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</div>
        {alsoTrend.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
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
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className="sm:w-[45%]  dark:text-gray-200  ">
      {alsoPolitics && <>
      <div className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>Politics</div>
        <div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {alsoPolitics[0].file && <img src={alsoPolitics[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={alsoPolitics[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#269b26]    text-white w-[max-content] rounded-md '}> Politics</div>
            </div>
            <div className="text-justify">
                <Link to={alsoPolitics[0].title.toString()} className="text-2xl  leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{alsoPolitics[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(alsoPolitics[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: alsoPolitics[0].description }}  />
                <div className="w-full mt-8"><Link to={alsoPolitics[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#269b26] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </div>
        </>}
      {alsoPolitics && <div className=" mt-16 pb-4 ">
        <div  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</div>
        {alsoPolitics.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <div className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"> <CircleIcon/> {item.title}</div>
                  </Link>
                  </>
                ))}</div>}</motion.div>
        <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className="w-full dark:text-gray-200  ">
    {alsoNews && <>
    <div  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white '>News</div>
        <div   className="pb-8 w-full  overflow-hidden text-justify   transition-all relative ">
            <div className="mt-4 relative ">
              {alsoNews[0].file && <img src={alsoNews[0].file} alt="" className=" rounded-2xl w-full mb-8 h-[250px] border-0 filter brightness-50"/>}
                <div className={alsoNews[0].file == null ? "hidden " : ' absolute top-5 left-5 mb-2 p-2 py-1 font-bold bg-[#4432cd]  text-white w-[max-content] rounded-md '}>  News</div>
            </div>
            <div className="text-justify">
                <Link to={alsoNews[0].title.toString()} className="text-2xl md:text-4xl leading-none font-bold text-black  dark:text-white hover:cursor-pointer title mt-4">{alsoNews[0].title}</Link>
                <div className="mt-4 text-md flex gap-2 items-center text-gray-500 dark:text-gray-400">
                 <AccessTimeIcon/> <span>{moment(alsoNews[0].createdAt.toDate()).calendar()}</span>
                </div>
                <div className="w-full h-[112px]  truncate whitespace-normal body pt-4 pb-8 leading-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: alsoNews[0].description }}  />
                <div className="w-full mt-8"><Link to={alsoNews[0].title.toString()} className="text-white bg-black dark:text-[#32cd32]  dark:bg-[rgb(50,205,50,0.1)] rounded-md dark:hover:text-[#35d535] hover:bg-[#269b26] text-center w-full font-bold p-4 ">Read more</Link></div>
                <div/>
            </div>
        </div>
        </>}
      {alsoNews && <div className=" mt-16 pb-4 ">
        <div  className='flex font-bold border-b-2 text-md mb-8 uppercase pb-2 border-black dark:text-white dark:border-white'>Also Read</div>
        {alsoNews.filter((item,i) => (i !== 0 && i < 11)).map((item) => (
                  <>
                  <Link  to={item.title.toString()} key={item.id} className=" overflow-x-hidden dark:text-white  w-full mt-4 flex gap-2  ">
                         <div className=" dark:hover:text-[#35d535] hover:text-[#35d535] font-bold title text-xl"> <CircleIcon/> {item.title}</div>
                  </Link>
                  </>
                ))}</div>}</motion.div>
      </div> }
                  </>
              </div>
  )
}
export default BlogPage