
const BtnCom = ({children,className,onclick}) => {

  return (
    <button className={` ${className} rounded-[5px] font-semibold text-2xl font-pop bg-[#0198E9] flex justify-center items-center py-[11px] px-11 text-white ` } onClick={onclick}>{children}</button>
  )
}

export default BtnCom
