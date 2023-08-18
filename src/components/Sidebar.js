import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import logo from '../data/logo.png';
import { Tooltip } from '@mui/material';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
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

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  return (
    <div className="ml-3 h-screen n pb-10 ">
      {activeMenu && (
        <motion.div variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div className="flex justify-between items-center ">
            <Link to="/" className="items-center gap-3 ml-3  mt-4 flex text-[2em] font-bold tracking-tight text-[#32cd32]">
            <img src={logo} alt="Logo" className='w-10 h-10 rounded-full' /><span class="">Reformer</span>
          </Link>
            <Tooltip title="Menu" placement="bottom">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: "#32cd32" }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "#32cd32" : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default Sidebar;
