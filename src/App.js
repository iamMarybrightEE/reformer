import { useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Home from './components/Home';
import Trending from './components/Trending';
import Politics from './components/Politics';
import News from './components/News';
import Music from './components/Music';
import Entertainment from './components/Entertainment';
import Viral from './components/Viral';
import Education from './components/Education';
import Latest from './components/Latest';
import BlogPage from './components/BlogPage';
import { useStateContext } from './contexts/ContextProvider';
import AddPost from './pages/AddPost';
import AdminDashboard from './pages/AdminDashboard';
import ManagePosts from './pages/ManagePosts';
import Comments from './pages/Comments';
import Likes from './pages/Likes';
import Users from './pages/Users';
import NotFound from './components/NotFound';
import Editpost from './components/Charts/EditPost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* blogSite  */}
      
      <Route path="/" element={(<RootLayout/>)} errorElement={(<NotFound/>)} ErrorBoundary={(<NotFound/>)}>
        <Route  index element={(<Home/>)} />
        <Route  path="trending" element={(<Trending/>)} />
        <Route  path="trending/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="trending/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics" element={(<Politics/>)} />
        <Route  path="politics/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="politics/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news" element={(<News/>)} />
        <Route  path="news/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="news/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music" element={(<Music/>)} />
        <Route  path="music/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="music/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment" element={(<Entertainment/>)} />
        <Route  path="entertainment/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="entertainment/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral" element={(<Viral/>)} />
        <Route  path="viral/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="viral/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education" element={(<Education/>)} />
        <Route  path="education/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="education/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest" element={(<Latest/>)} />
        <Route  path="latest/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path="latest/:id/:id/:id/:id/:id/:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id" element={(<BlogPage/>)} />
        <Route  path=":id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id:id/:id/:id/:id" element={(<BlogPage/>)} />
        <Route  path=":id/:id/:id/:id/:id:id/:id/:id/:id/:id" element={(<BlogPage/>)} />
      </Route>
      
      {/* dashboard  */}
      <Route path="/dashboard" element={(<AdminDashboard/>)} />
      <Route path="add a post" element={<AddPost />} />
      <Route path="manage posts" element={<ManagePosts />} />
      <Route path="/edit/:id" element={<Editpost />}/>
      <Route path="users" element={<Users />} />
      <Route path="likes" element={<Likes />} />
      <Route path="comments" element={<Comments />} />
      <Route path='*' element={(<NotFound/>)} />  
           
    </>
)
)
const App = () => {
  const { setCurrentMode, currentMode } = useStateContext();
  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if ( currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="overflow-x-hidden">
      <RouterProvider router={router}/>
      </div>
    </div>
  );
};
export default App;
