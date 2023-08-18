import {  NavLink } from 'react-router-dom';
import { siteLinks } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
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
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};
const MenuBar = () => {
  const {activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
          <motion.div className=" justify-between w-full gap-8 items-center text-xl p-8 px-12 pt-2 font-bold border-b-2 dark:text-gray-50  md:flex menu"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{display: activeMenu ? "block":"none"}}>            
            {activeMenu && siteLinks.map((item) => (
              <nav key={item.title} className={"w-[50%] sm:w-full sm:flex  justify-between  relative px-10" }  onClick={handleCloseSideBar}>                
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    className=" p-2 flex items-center  w-[max-content] "                   
                  >
                    <span className="capitalize active:text-[#32cd32] sm:active:border-b-2 sm:active:border-[#32cd32] hover:text-[#32cd32]">{link.name}</span>
                  </NavLink>
                ))}
              </nav>
            ))}
          </motion.div>   
  );
}
export default MenuBar;