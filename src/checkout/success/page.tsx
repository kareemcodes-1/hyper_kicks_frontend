import React, { useEffect } from 'react'
import { useStore } from '../../store/store';

const SuccessPage = () => {

  useEffect(() => {
      const {deleteAllCartItems} = useStore();
      deleteAllCartItems();
  }, []);

  return (
    <div>SuccessPage</div>
  )
}

export default SuccessPage