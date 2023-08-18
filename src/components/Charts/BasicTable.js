import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStateContext } from '../../contexts/ContextProvider';
import {getDocs, collection} from 'firebase/firestore';
import { db } from '../../data/firebase-config';
import { useEffect } from 'react';
export default function BasicTable() {
  const { postList, setPostList } = useStateContext();
useEffect(() => {
    getTrendingPost()
  }, []);
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
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,  color: "rgba(96, 96, 96)" }} aria-label="simple table"  className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9  shadow-lg transition-all ">
        <TableHead>
          <TableRow>
            <TableCell>Blog Title</TableCell>
            {/* <TableCell align="right">Blog Description</TableCell> */}
            {/* <TableCell align="right">File</TableCell> */}
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postList && postList.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              {/* <TableCell align="right">{item.description}</TableCell> */}
              {/* <TableCell align="right">{item.file}</TableCell> */}
              <TableCell align="right">{item.createdAt.toDate().toDateString()}</TableCell>
              <TableCell align="right"><button>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
