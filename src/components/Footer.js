import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => (
  <div className="mt-24 overflow-hidden">
    <div className='dark:text-gray-200 text-gray-700 text-center '>      
          <a href='#'><FacebookIcon className='mr-2 hover:scale-110 hover:text-[#32cd32] hover:cursor-pointer'/></a>
          <a href='#'><TwitterIcon className='mr-2 hover:scale-110 hover:text-[#32cd32]  hover:cursor-pointer'/></a>
          <a href='#'><InstagramIcon className='mr-2 hover:scale-110 hover:text-[#32cd32]  hover:cursor-pointer'/></a>
        </div>
    <p className="dark:text-gray-200 text-gray-700 text-center mt-5 m-20">
      © 2023 All rights reserved by Reformer.com
    </p>
  </div>
);
export default Footer;
