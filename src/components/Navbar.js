import  { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStateContext } from '../contexts/ContextProvider';
import {FaAdjust} from  'react-icons/fa';
import ThemeSettings from './ThemeSettings';
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
    x:"-100vw"
  },
  visible: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    x:0
  },
  hide: { 
    opacity: 0, 
    x:"100vw"
  },
  show: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    x:0
  },
  down: { 
    opacity: 0, 
    y:"100vh"
  },
  up: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    y:0
  },
  high: { 
    opacity: 0, 
    y:"-100vh"
  },
  low: { 
    opacity: 1, 
    transition: { delay: 0.5, duration: 1.5 },
    y:0
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"np
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);
const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize, toggleTheme, setToggleTheme } = useStateContext();
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
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <motion.div className="flex justify-between p-2 md:ml-6 md:mr-6 relative  "
    variants={containerVariants}
      initial="high"
      animate="low"
      exit="exit"
    >
      <NavButton title="Menu" customFunc={handleActiveMenu} color="#32cd32" icon={<MenuIcon />} />
      <div className="flex">        
        <div className="flex items-center gap-2 cursor-pointer p-1  rounded-lg" > 
          <NavButton title="Theme" customFunc={() => setToggleTheme(!toggleTheme)}  color='#32cd32' icon={<FaAdjust />} />
        {toggleTheme && (<ThemeSettings />)}          
            <p>
              <AccountCircleIcon className='mr-4 text-[#32cd32]'/> 
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Chief Admin
              </span>
            </p>            
          </div>
      </div>
    </motion.div>
  );
};
export default Navbar;
