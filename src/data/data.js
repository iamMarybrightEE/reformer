import { useStateContext } from '../contexts/ContextProvider';
import {getDocs, collection} from 'firebase/firestore';
import { db } from '../data/firebase-config';
const data = () => {
    useEffect(()=> {
        getTrendingPost()
        getNewsPost()
        getPoliticsPost()
        getMusicPost()
        getEntertainmentPost()
        getViralPost()
        getEducationPost()
        getLatestPost()

        }, [])
  return (
    <div>data</div>
  )
}

export default data
   const trendingPostCollection = collection(db, "trending");
   const getTrendingPost = async () => {
    const data = await getDocs(trendingPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
    
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
    setPostList(newData);
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
    setPostList(newData);
  };
   const musicsPostCollection = collection(db, "music");
   const getMusicPost = async () => {
    const data = await getDocs(musicsPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
  };
   const entertainmentPostCollection = collection(db, "entertainment");
   const getEntertainmentPost = async () => {
    const data = await getDocs(entertainmentPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
  };
   const viralPostCollection = collection(db, "viral");
   const getViralPost = async () => {
    const data = await getDocs(viralPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
  };
   const educationPostCollection = collection(db, "education");
   const getEducationPost = async () => {
    const data = await getDocs(educationPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
  };
   const latestPostCollection = collection(db, "latest");
   const getLatestPost = async () => {
    const data = await getDocs(latestPostCollection);
    const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(newData);
  };
  export const getSinglePost = async ({params}) => {
  
  const {id} = params;
      const q = query(collection(db, "trending"), where("id", "==", id));

const data = await getDocs(q);

  const docs = data?.docs
    const sortedData = docs?.sort((a,b)=> a.date - b.date);
    const newData = sortedData.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    return newData
    }