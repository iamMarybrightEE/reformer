import { DataGrid } from '@mui/x-data-grid';
import { useStateContext } from '../../contexts/ContextProvider';
import {getDocs, collection, query, orderBy, where} from 'firebase/firestore';
import { db } from '../../data/firebase-config';
import { useEffect } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
export default function DataTable() {
  const { postList, setPostList } = useStateContext();
useEffect(() => {
    getTrendingPost()
  }, []);
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
const trendingPostCollection = collection(db, "trending");
 const getTrendingPost = async () => {
    const q = query(trendingPostCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(docs);
    
  };
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
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deleteTrendingPost(params.value)}}> Delete</button>
      </>
    ),
  },
];
const launchOptimistic =postList && postList.map(function(elem) {
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
    <div style={{ height: 400, width: '100%' }} className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl shadow-lg transition-all ">
      {postList && <DataGrid
        rows={launchOptimistic}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />}
    </div>
  );
}