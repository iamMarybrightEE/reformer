import { DataGrid } from '@mui/x-data-grid';
import { useStateContext } from '../../contexts/ContextProvider';
import {getDocs, collection, query, orderBy, where} from 'firebase/firestore';
import { db } from '../../data/firebase-config';
import { useEffect } from 'react';
import moment from 'moment';
const CommentsDataTable = () => {
    const { postList, setPostList } = useStateContext();
     useEffect(() => {
    
    getComments()
  }, []);
  const commentCollection = collection(db, "comments");
   const getComments = async () => {
    const q = query(commentCollection,orderBy("createdAt", "desc"));
    const data = await getDocs(q);
    const docs = data?.docs.map((doc,index) => ({
      ...doc.data(),
      id: index,
    }));
    setPostList(docs);
    
  };
  const deletePost = async (id) => {
const q = query(collection(db, "comments"), where("body", "==", id));
const snapshot = await getDocs(q)
const result = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}))
result.forEach(async (result) => {
  const docRef = doc(db, "comments", result.id)
  await deleteDoc(docRef).then(() => {
    console.log("deleted")
  })
})
    }
  function DataTable() {
    const columns = [
  {  field: 'id', headerName: 'ID', width: 70,  headerClassName: 'font-bold dark:text-gray-400 text-md w-[50%]',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md"> {params.value}</div>,},
     {field: 'image',
    headerName: 'IMAGE',
    width: 70,
    headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <img className='w-[50px] h-[50px] rounded-[50%]' src={params.value} />, // renderCell will render the component
  },
  { field: 'displayName', headerName: 'NAME', width: 150, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>, },
    { field: 'blogTitle', headerName: 'POST', width: 300, headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left', renderCell: (params) => <div className="w-full  dark:text-gray-200 text-md "> {params.value}</div>,  },
  { field: 'comment', headerName: 'COMMENT', width: 300, headerClassName: 'font-bold dark:text-gray-400 text-md',
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
    width: 250,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => <div className="w-full  dark:text-gray-200"> {params.value}</div>,
  },
   {
    field: 'action',
    headerName: 'ACTION',
    sortable: false,
    width: 70,
     headerClassName: 'font-bold dark:text-gray-400 text-md',
    headerAlign: 'left',
    renderCell: (params) => (
      <button className="bg-[#d61a1a] text-white p-2 font-bold my-4  rounded-md" onClick={() => {deletePost(params.value)}}> Delete</button>
    ),
  },
];
const launchOptimistic = postList.map(function(elem) {
  return {
    image: elem.profilePicture,
    id: elem.id,
    blogTitle: elem.name,
    displayName: elem.displayName,
    comment: elem.body,
    time: moment(elem.createdAt.toDate()).format('LT'),
    date: moment(elem.createdAt.toDate()).calendar(),
    action: elem.body
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
  return (
    <div>{ postList &&  <DataTable/>}</div>
  )
};
export default CommentsDataTable;