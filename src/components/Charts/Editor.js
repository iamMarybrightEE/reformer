import {useState} from 'react';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { db, storage } from '../../data/firebase-config';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { postLinks } from '../../data/dummy';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Description } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
function EditorComponent() {
  const [imgUrl, setImgUrl] = useState(null);
  const [category, setCategory] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
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
  const [userInfo, setuserInfo] = useState({
    title: '',
    category:'trending'
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  }
 
  const ondescription = (value) => {
    setuserInfo({ ...userInfo,
      description:value
    });
  } 
  const onCategory = (e) => {
    setCategory(e.target.value);
  } 
  const addDetails = async (event) => {
   const postCollectionRef = collection(db, category)  
    try {
      event.preventDefault();
      event.persist();
       addDoc(postCollectionRef,{
        title: userInfo.title,
        description: userInfo.description,
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
<>
  <div className="shadow-lg rounded-xl p-2 w-full bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"> 
  <App/>  
        <form onSubmit={addDetails} className=" p-4 pt-0 mt-0  bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg"  id='form'>
          <div className="">
            <div className="">
              <label className="font-bold block p-2 pl-0 m-2"> Title <span className="text-red-500"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className=" bg-transparent border-2  border-gray-200 w-full p-2 rounded-lg outline-none" placeholder="Title" required />
            </div>
            <div className="">
              <label className=" font-bold block p-2 pl-0 m-2"> Description <span className="text-red-500"> * </span> </label>
                <div className=' h-full mb-24 sm:mb-0 dark:placeholder:bg-red-100'>
                <EditorToolbar toolbarId={'t1'}/>
            <ReactQuill
              theme="snow"
              value={userInfo.description}
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
              <div className="mt-4">{imgUrl && `file uploaded ${imgUrl}`}</div>
                <label className=" font-bold block p-2 pl-0 m-2"> Category </label>
                <select name="category" className=" bg-white w-full border-2  border-gray-200 p-2 rounded-lg focus:outline-none dark:text-gray-200 dark:bg-secondary-dark-bg outline-none"  value={category} onChange={onCategory}>
                  <option value="category">Select category</option>
                  {postLinks.map((link) => (
                    
                  <option value={link}>{link}</option>              
                ))}
                </select>                  
                <button type="submit" className="p-2 rounded-lg m-2 mx-0 font-bold bg-[#32cd32] text-white w-full text-center"> Publish  </button>
              </div>
        </form>
      </div>
</>
)
}
export default EditorComponent;