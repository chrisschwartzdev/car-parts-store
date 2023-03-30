import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStoreStore from "../../stores/storeStore";


const StoreResetter = () => {
  const { resetQuery } = useStoreStore(it => ({ resetQuery: it.resetQuery }))
  const location = useLocation();

  useEffect(() => {
    resetQuery();
  }, [location, resetQuery])

  return null;
}

export default StoreResetter;