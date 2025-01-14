import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";
import { useStore } from "../../store/store";

const SearchModal = ({
  setOpenSearchModal,
  openSearchModal,
}: {
  setOpenSearchModal: () => void;
  openSearchModal: boolean;
}) => {


  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const {handleSearch} = useStore();

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if(e.key === 'Enter'){
          handleSearch(value);
          navigate(`/search/product?q=${value.toLowerCase().split(' ').join('-')}`);
      }
  }
  
  return createPortal(
    <div
      className={`fixed top-0 right-0 h-screen lg:w-[60%] w-full bg-white shadow-lg z-[100] transform transition-transform duration-300 ${
        openSearchModal ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="">
          <div
            className="absolute right-[1rem] top-[1rem] text-[2rem] cursor-pointer bebas"
            onClick={setOpenSearchModal}
          >
            CLOSE
          </div>
        </div>
      <div className="flex items-start p-[1rem] mt-[10rem] gap-[1rem]">
        <div className="border-b border-black w-full">
            <input type="text"  placeholder="SEARCH PRODUCTS..." className="lg:text-[2rem] text-[1.5rem] w-full bg-transparent outline-none" id="" onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}/>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
