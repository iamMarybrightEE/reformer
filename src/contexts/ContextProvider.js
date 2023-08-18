import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  search: false
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(null);
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [user, setUser] = useState(false);
  const [postList, setPostList] = useState('');
  const [trends, setTrends] = useState('');
  const [viral, setViral] = useState('');
  const [education, setEducation] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [politics, setPolitics] = useState('');
  const [alsoTrend, setAlsoTrend] = useState('');
  const [alsoNews, setAlsoNews] = useState('');
  const [alsoPolitics, setAlsoPolitics] = useState('');
  const [latest, setLatest] = useState('');
  const [news, setNews] = useState('');
  const [music, setMusic] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [toggleSearch, setToggleSearch] = useState(false)
  const [toggleTheme, setToggleTheme] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [popup, setPopup] = useState(false)

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider value={{  currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu,  setCurrentMode, setMode,  themeSettings, setThemeSettings, postList, setPostList, toggleTheme, setToggleTheme, toggleSearch, setToggleSearch, user, setUser, trends, setTrends, viral, setViral, education, setEducation,entertainment, setEntertainment, politics, setPolitics, latest, setLatest, news, setNews, music, setMusic, likes, setLikes, dislikes, setDislikes,comments, setComments, toggleMenu, setToggleMenu, alsoTrend, setAlsoTrend, alsoNews, setAlsoNews, alsoPolitics, setAlsoPolitics}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
