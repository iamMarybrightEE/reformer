import React,{useState, useEffect} from 'react';
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import {addDoc, collection, serverTimestamp,getDocs,  query, orderBy, where, updateDoc} from 'firebase/firestore';
import { db, storage } from '../../data/firebase-config';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { postLinks } from '../../data/dummy';
import { useParams } from 'react-router-dom';
import SkeletonArticle from '../../skeletons/SkeletonArticle'; 
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { useStateContext } from '../../contexts/ContextProvider';
function Editpost() {
  const {  setCurrentMode, currentMode, activeMenu } = useStateContext();
   const [singleTrend, setSingleTrend] = useState("")
  const [singlePolitics, setSinglePolitics] = useState("")
  const [singleNews, setSingleNews] = useState("")
  const [singleMusic, setSingleMusic] = useState("")
  const [singleEntertainment, setSingleEntertainment] = useState("")
  const [singleViral, setSingleViral] = useState("")
  const [singleEducation, setSingleEducation] = useState("")
  const [singleLatest, setSingleLatest] = useState("")
    const {id} = useParams();
    useEffect(() => {
    getSingleTrendingPost()
    getSingleEducationPost()
    getSingleMusicPost()
    getSingleEntertainmentPost()
    getSingleLatestPost()
    getSingleViralPost()
    getSingleNewsPost()
    getSinglePoliticsPost()        
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
 
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [category, setCategory] = useState(null);
function App() {  
  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  return (
    <div className=" bg-white p-2 mb-0  dark:text-gray-200 dark:bg-secondary-dark-bg">
      <form onSubmit={handleSubmit} className='px-2'>
        <label htmlFor="file" className="font-bold block p-2 pl-0 m-2 w-full hover:cursor-pointer"> Upload post image here or <span className="text-[#37e237] font-bold">Browse</span> </label>
        <div className='flex items-center justify-between flex-wrap'>
          <input type='file' id="file" className='block p-2 hover:cursor-pointer border-2 h-full border-gray-200 bg-main-bg w-[75%] bg-transparent rounded-lg outline-none file:bg-transparent file:border-none file:text-gray-400' />
        <button type='submit' className='bg-[#32cd32] text-white m-2  p-2 py-3 rounded-lg w-[20%] min-w-[max-content] font-bold'>Upload file</button>
        </div>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar   p-2 m-2 mb-0 w-full' > Progress: { progresspercent}%</div>
        </div>
      }
      {
        imgUrl && <div className='w-[200px] p-2 h-[200px]'><img src={imgUrl} alt='uploaded file' className='h-full w-full' /></div>
      }
    </div>
  );
}
const [userInfo, setuserInfo] = useState(); 
const [description, setDescription] = useState(); 
  const onChangeValue = (e) => {
    setuserInfo(e.target.value);
  }
 
  const ondescription = (e) => {
    setDescription(e.target.value)
  } 
  const onCategory = (e) => {
    setCategory(e.target.value);
  } 
const updateDetails = async (event) => {
   const postCollectionRef = collection(db, category)  
    try {
      event.preventDefault();
      event.persist();
       updateDoc(postCollectionRef,{
        title: userInfo,
        description,
        file: imgUrl,
        createdAt: serverTimestamp(),
        id: userInfo.title
      }).then(()=>{
        setuserInfo({
          title:'',
          description:''
        })
        
        setImgUrl(null)
        console.log("done")
      }
      ).catch(err => alert(err.message))     
    } catch (error) { throw error;}    
  } 
 
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
            <div className='w-full p-8'> 
             <div className="">
  {!(singleTrend,singleNews,singleMusic,singleNews,singlePolitics,singleEntertainment,singleEducation,singleViral) && [1,2].map((n) => <SkeletonArticle key={n} theme="light" />)}
    
    {singleTrend && singleTrend.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form onSubmit={updateDetails} className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title} onChange={onChangeValue}  className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        onChange={ondescription}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none" onChange={onCategory} >
                            <option value="category">trending</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleNews && singleNews.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  >
                            <option value="category">news</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singlePolitics && singlePolitics.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  >
                            <option value="category">politics</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleMusic && singleMusic.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  >
                            <option value="category">music</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleEntertainment && singleEntertainment.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  >
                            <option value="category">entertainment</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleViral && singleViral.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none" >
                            <option value="category">viral</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleEducation && singleEducation.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form  className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  >
                            <option value="category">education</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
{singleLatest && singleLatest.map((item) => (
                  <>
                  
                <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg">
                    <App/>
                <form className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
                    <div className="">
                        <div className="">
                        <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
                        <input type="text" name="title" value={item.title}   className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
                        </div>
                        <div className="">
                        <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                            <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                            <EditorToolbar toolbarId={'t1'}/>
                        <ReactQuill
                        theme="snow"
                        value={item.description}
                        placeholder={"Write something awesome..."}
                        modules={modules('t1')}
                        formats={formats}
                        className='h-[200px] sm:h-[300px] '
                        />
                            </div>              
                        </div>            
                    </div> 
                        <div className='mt-32 lg:mt-12'>
                        <div className="mt-4">{imgUrl && `file uploaded ${item.file}`} </div>
                            <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                            <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none" >
                            <option value="category">latest</option>
                            {postLinks.map((link) => (
                                
                            <option value={link}>{link}</option>              
                            ))}
                            </select>                  
                            <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
                        </div>
                    </form>
                </div>
                  </>
                ))}
              </div>             
            </div>
            <Footer />
          </div>
        </div>
    </div>
    </div>

)
}
export default Editpost