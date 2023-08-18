import{ useEffect} from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Navbar, Footer, Sidebar } from '../components';
import {getDocs, collection, deleteDoc, doc,  query, where, orderBy} from 'firebase/firestore';
import { db } from '../data/firebase-config';
import { DataGrid } from '@mui/x-data-grid';
import SkeletonArticle from '../skeletons/SkeletonArticle';
import moment from 'moment';
import { Link } from 'react-router-dom';
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


const ManagePosts = () => {
  const {  setCurrentMode, currentMode, activeMenu,  trends, setTrends, viral, setViral, education, setEducation,entertainment, setEntertainment, politics, setPolitics, latest, setLatest, news, setNews, music, setMusic } = useStateContext();
  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if ( currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
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
  const deleteTrendingPost = async (id) => {
const q = query(collection(db, "trending"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "trending", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deletePoliticsPost = async (id) => {
const q = query(collection(db, "politics"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "politics", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteNewsPost = async (id) => {
const q = query(collection(db, "news"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "latest", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteMusicPost = async (id) => {
const q = query(collection(db, "music"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "music", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteEntertainmentPost = async (id) => {
const q = query(collection(db, "entertainment"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "entertainment", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteEducationPost = async (id) => {
const q = query(collection(db, "education"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "education", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteLatestPost = async (id) => {
const q = query(collection(db, "latest"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "latest", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  const deleteViralPost = async (id) => {
const q = query(collection(db, "viral"), where("title", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "viral", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  function TrendingDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md w-[50%]',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
      <>
      <Link to={`/edit/${params.value}`} postList={params.value} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteTrendingPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = trends.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white font-extrabold  dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {trends && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function PoliticsDataTable() {
   const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md w-[50%]',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
      <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deletePoliticsPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = politics.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white font-extrabold  dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {politics && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function NewsDataTable() {
   const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md w-[50%]',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
      <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteNewsPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = news.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white font-extrabold dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {trends && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function MusicDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  
  
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
       <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteMusicPost(params.value)}}> Delete</button>
      </>
    ),
  },
];


const launchOptimistic = music.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});

   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white   dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {music && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function EntertainmentDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },  
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
      <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteEntertainmentPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = entertainment.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
   time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white   dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {entertainment && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function EducationDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
       <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteEducationPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = education.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white   dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {education && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function LatestDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  
  
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
       <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteLatestPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = latest.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white   dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {latest && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}
  function ViralDataTable() {
  const columns = [
  { field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>, },
     {
    field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'title', headerName: 'TITLE', width: 600, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  
  
  {
    field: 'time',
    headerName: 'TIME',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'date',
    headerName: 'DATE',
    type: 'number',
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>, 
  },
  {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 150,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) =>(
       <>
      <Link to={`/edit/${params.value}`} className="bg-[#32cd32] text-white p-2 font-bold m-4  rounded-md"> Edit </Link>
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteViralPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic = viral.map(function(elem) {
  return {
    image: elem.file,
    id: elem.id,
    title: elem.title,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.title
  } 
});
   return (
    <div style={{ height: 400, width: '100%' }} className="bg-white   dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg  ">
      {viral && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
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
              {!(trends, politics, news, music, entertainment, viral, education, latest) && [1,2].map((n) => <SkeletonArticle key={n} theme="light" />)}
              {trends && <div>
                 <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 '>Trending Posts</motion.div>
              <TrendingDataTable/>   </div>
              }
              {politics && <div>
                 <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Politics Posts</motion.div>
              <PoliticsDataTable/>   </div>
              }
              {news && <div>
                 <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>News Posts</motion.div>
              <NewsDataTable/>   </div>
              }
              {music && <div>
                <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Music Posts</motion.div>
              <MusicDataTable/>   </div>
              }
              {entertainment && <div>
                 <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Entertainment Posts</motion.div>
              <EntertainmentDataTable/>   </div>
              }
              {viral && <div>
                 <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Viral Posts</motion.div>
              <ViralDataTable/>   </div>
              }
              {education && <div>
                 <motion.div variants={containerVariants}
          initial="hide"
          animate="show"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Education Posts</motion.div>
              <EducationDataTable/>   </div>
              }
              {latest && <div>
                 <motion.div variants={containerVariants}
          initial="down"
          animate="up"
          exit="exit" className='text-gray-900 dark:text-gray-200 text-3xl font-bold rounded-t-2xl  m-8 ml-0 mt-12'>Latest Posts</motion.div>
              <LatestDataTable/>   </div>
              }
            </div>             
            <Footer />
          </div>
        </div>
    </div>
    </div>
  );
}
export default ManagePosts