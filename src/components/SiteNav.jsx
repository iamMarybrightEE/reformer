import { Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import logo from '../data/logo.png'
import {FaAdjust} from  'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeSettings} from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useEffect } from 'react';
import {motion} from 'framer-motion'

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
  },
  visible: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.5 }
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);
const SiteNav = () => {
  const {activeMenu,setActiveMenu,toggleTheme, setToggleTheme,  setScreenSize,screenSize} = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <>     
    <motion.div className="flex justify-between px-10 py-10 md:ml-6 md:mr-6 relative items-center "
    variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-center  ">
        <Link to="/" className="items-center gap-3 ml-3  flex text-[2em] font-bold tracking-tight text-[#32cd32]">
            <img src={logo} alt="Logo" className='w-10 h-10 rounded-full' /><span class="">Reformer</span>
          </Link>
      </div>
      <div className="flex items-center">        
        <NavButton title="Theme" customFunc={() => setToggleTheme(!toggleTheme)} content="change " color='#32cd32' icon={<FaAdjust />} />
        {toggleTheme && (<ThemeSettings />)}
        <div className="md:hidden">
      <NavButton title="Menu" customFunc={() => setActiveMenu(!activeMenu)} color='#32cd32' className="nav-toggle" icon={activeMenu ? <CloseIcon /> : <MenuIcon/>} />    
        </div>
      </div>
    </motion.div>
    </>
  );
};
export default SiteNav;
