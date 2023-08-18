import { useStateContext } from '../contexts/ContextProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
const ThemeSettings = () => {
  const { setMode, currentMode, toggleTheme, setToggleTheme} = useStateContext(); 
 return (
    <div className="   fixed nav-item z-10 w-full  h-[80vh] right-5 md:right-20 top-16"
        onClick={() => setToggleTheme(!toggleTheme)}>
      <div className="w-full flex justify-end" onClick={(e) => e.stopPropagation()}>
        <div  className="right-5 md:right-20 top-32 bg-white dark:bg-[#42464D] text-gray-700 w-max dark:text-gray-300 rounded-lg p-4 shadow-lg " >
      <div className="mt-4 ">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer hidden theme checked:text-[#32cd32] "
              onChange={setMode}
              checked={currentMode === 'Light'}
              onClick={() => setToggleTheme(!toggleTheme)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="light" className=" text-md cursor-pointer active:text-[#32cd32] checked:text-[#32cd32]">
             <LightModeIcon/> Light Mode
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              className="cursor-pointer theme hidden"
              checked={currentMode === 'Dark'}
              onClick={() => setToggleTheme(!toggleTheme)}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="dark" className=" text-md cursor-pointer active:text-[#32cd32] selected:text-[#32cd32] checked:text-[#32cd32]">
              <DarkModeIcon/> Dark Mode
            </label>
          </div>
    </div>
      </div>
    </div>
  );
};
export default ThemeSettings;
