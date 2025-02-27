import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { Link, useNavigate } from "react-router";
// import SplitText from "gsap-trial/SplitText";
// import gsap from "gsap";
import CartModal from "./modals/CartModal";
import SearchModal from "./modals/SearchModal";
import { Menu, Search, ShoppingCart } from "lucide-react";
import MenuModal from "./modals/MenuModal";

// gsap.registerPlugin(SplitText);

const Navbar = () => {
  let {
    userInfo,
    logout,
    collections,
    setCollections,
    setProducts,
    cart,
    openCartModal,
    setOpenCartModal,
  } = useStore();
  let navigate = useNavigate();
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const [openMenuModal, setOpenMenuModal] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/collections`);
      const data = await res.json();
      setCollections(data);
    })();
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`).then((res) => res.json())
    .then((data) => setProducts(data));
   }, []);

  async function Logout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/logout`, {
        method: "POST",
      });

      if (res.ok) {
        logout();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="fixed w-full top-0 py-[.5rem] lg:px-[2rem] px-[1.5rem] border-b border-black z-[100]">
      
      <div className="lg:hidden block">
            <MenuModal openMenuModal={openMenuModal} closeModal={() => setOpenMenuModal(false)}/>
        </div>

      <nav className="flex items-center justify-between">
        <a className="text-[1.5rem] text-black bebas" href="/">
          HYPERKICKS
        </a>

        <ul className="lg:flex hidden items-center gap-[1rem] text-black">
          {collections.map((collection) => (
            <li key={collection._id}>
              <a
                href={`/collections/collection/${collection._id}`}
                className="text-[1.1rem] "
              >
                {collection.name}
              </a>
            </li>
          ))}
          {/* <li><a href="" className='text-[1.2rem] '>MENS</a></li>
                <li><a href="" className='text-[1.2rem]'>WOMENS</a></li>
                <li><a href="" className='text-[1.2rem]'>KIDS</a></li> */}
        </ul>

        <div className="lg:hidden flex items-center gap-[.8rem]">
        <Menu className="cursor-pointer" onClick={() => setOpenMenuModal(true)}/>
        <ShoppingCart className="cursor-pointer" onClick={() => setOpenCartModal(true)}/>
        <Search className="cursor-pointer" onClick={() => setOpenSearchModal(true)} />
        </div>



        <div className="lg:flex hidden items-center gap-[1rem] text-[1.1rem] text-black">
          <div
            onClick={() => setOpenCartModal(true)}
            className="cursor-pointer"
          >
            Cart ({cart.length})
          </div>
          <div
            onClick={() => setOpenSearchModal(true)}
            className="cursor-pointer"
          >
            Search
          </div>
          <Link to={'/wishlists'}>Wishlist</Link>
          {userInfo ? (
            <div
              onClick={() => setOpenProfileMenu(!openProfileMenu)}
              className="cursor-pointer hover:bg-gray-200 rounded-full transition hover:opacity-80"
            >
              <img
                src={userInfo?.avatar}
                alt={userInfo?.name}
                className="w-[1.5rem] h-[1.5rem] rounded-full"
              />
            </div>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}

          {openProfileMenu && (
            <div className="absolute right-0 top-[3rem] mt-2 w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="flex flex-col text-[.925rem]">
                  <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</Link>
                  <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to="/orders">Orders</Link>
                  <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to="/settings">Settings</Link>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={Logout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      

      {openCartModal && (
        <CartModal
        />
      )}
      {openSearchModal && (
        <SearchModal
          setOpenSearchModal={() => setOpenSearchModal(false)}
          openSearchModal={openSearchModal}
        />
      )}
    </header>
  );
};

export default Navbar;
