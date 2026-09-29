const BtnCom = ({ children, className = '', onClick }) => {
  return (
    <button 
      className={`rounded-[5px] font-semibold text-2xl font-pop bg-[#0198E9] flex justify-center items-center py-[11px] cursor-pointer px-11 text-white whitespace-nowrap ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BtnCom;