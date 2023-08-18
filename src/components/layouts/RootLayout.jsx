import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom';
import SiteNav from '../SiteNav';
import MenuBar from '../MenuBar';
import Footer from '../Footer'
import { useStateContext } from '../../contexts/ContextProvider';
import { Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ScrollRestoration } from "react-router-dom";
import {motion} from 'framer-motion'
import SkeletonArticle from '../../skeletons/SkeletonArticle'
const RootLayout = () => {
  const [scroll, setScroll] = useState(false)
     const { setCurrentMode, currentMode} = useStateContext();
function scrollToTop() {
  window.scrollTo(0, 0);
}
window.onscroll = function(){
    let scrollLength = this.pageYOffset;
    if(scrollLength > 500){
        setScroll(true)
    }
    else{setScroll(false)}    
}
  useEffect(() => {
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      {!(<SiteNav/>) && [1,2].map((n) => <SkeletonArticle key={n} theme="light" />)}
      <ScrollRestoration/>
       <div className='bg-main-bg dark:bg-main-dark-bg w-[100vw] '>
        {scroll && <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <Tooltip
              title="Scroll up" placement="top"
            >
              <button
                type="button"
                onClick={() => scrollToTop()}
                style={{ background: "#32cd32", borderRadius: '50%' }}
                className="text-3xl font-extrabold text-white p-2 pt-0 hover:drop-shadow-xl "
              >
                <ArrowUpwardIcon />
              </button>
            </Tooltip></div>}
            <header>

            <SiteNav/>
            <MenuBar/>
            </header>
         <div className='grid grid-cols-12'>
        <div className=' col-span-12 lg:col-span-3  '>
        </div>
        <main className=' col-span-12 lg:col-span-6 font-[0.8em] md:[1em]'>
          <Outlet/>
           
        
        </main>
        <div className=' col-span-12 lg:col-span-3'></div>
      </div>  
        <Footer/>
      </div>
    </div>
  )
}
export default RootLayout