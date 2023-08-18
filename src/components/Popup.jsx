const Popup = (props) => {
  return (
    <div  className="right-5 md:right-20 top-32 bg-white dark:bg-[#42464D] text-gray-700 w-max dark:text-gray-300 rounded-lg p-4 shadow-lg " >
      {props.message}
    </div>
  )
}
export default Popup