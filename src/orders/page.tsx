
import { useEffect } from 'react'
import Layout from '../layout'
import { useStore } from '../store/store'

const OrdersPage = () => {

  const {userInfo, orders, setOrders} = useStore();

  useEffect(() => {
    if(userInfo){
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/orders/user/${userInfo._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
    }
  }, []);


  return (
    <Layout>
        <div className='mt-[5rem] px-[1.5rem] text-[4rem]'>
             <h1>ORDERS</h1>

             <div className='grid grid-cols-2 gap-[1rem]'>
                 {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className='border border-black w-[20rem]'>
                              {order.products.map((product) => (
                                 <img src={product.productId.images[0]} alt="" />
                              ))}
                        </div>
                    ))
                 ) : (
                    <div>
                      No Orders.
                    </div>
                 )}
             </div>
        </div>
    </Layout>
  )
}

export default OrdersPage