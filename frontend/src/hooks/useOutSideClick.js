import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
   const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)
         && e.target?.id !== 'search-img1') {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;