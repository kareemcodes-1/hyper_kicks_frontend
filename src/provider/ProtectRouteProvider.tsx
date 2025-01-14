import{ ReactNode } from 'react'
import { useStore } from '../store/store'
import { Navigate } from 'react-router';

const ProtectRouteProvider = ({children} : {children: ReactNode}) => {

    const {userInfo} = useStore();

  return userInfo ? <>{children}</> : <Navigate to={'/login'}/>
}

export default ProtectRouteProvider