import { ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <>
        <Navbar />
             <main>
             {children}
             </main>
        <Footer />
    </>
  )
}

export default Layout