import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Layout from '../layout'
import { useStore } from '../store/store'
import toast from 'react-hot-toast';

import { useFormStatus } from 'react-dom';
import Loading from '../components/loading';
import Marquee from 'react-fast-marquee';

const SubmitBtn = () => {

    const {pending} = useFormStatus();

      const [hovered, setHovered] = useState<boolean>(false);

    function handleMouseEnter(){
        setHovered(true);
    }

    function handleMouseLeave(){
        setHovered(false);
    }

    return (
        <button type="submit" disabled={pending} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='bg-[#ddb31b] text-[1.5rem] bebas flex items-center justify-center border border-black text-black h-[2.5rem] px-4 rounded-[10rem] w-[10rem] cursor-pointer uppercase'>{pending ? <Loading  type='black'/> : hovered ? <Marquee autoFill>&nbsp; SUBMIT </Marquee> : 'SUBMIT'}</button>
    )
  }

const ProfilePage = () => {

    const {userInfo, setUserInfo} = useStore();

    const [name, setName] =  useState<string>('');
    const [email, setEmail] =  useState<string>('');
    const [password, setPassword] =  useState<string>('');
    const [oldPassword, setOldPassword] =  useState<string>('');
    const [imagePreview, setImagePreview] =  useState<string>('');
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if(file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                const image = fileReader.result;
                if(typeof image === "string"){
                    setImagePreview(image);
                }
            }
        }
    }
    

    
    const updateUser = async () => {
            const data = {
                name,
                email,
                avatar: imagePreview,
                password,
                old_password: oldPassword
            }
    
            if(userInfo){
                try {
                    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/profile/${userInfo._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
        
                    if(res.ok){
                        const updatedUser = await res.json();
                        setUserInfo(updatedUser);
                        setName('');
                        setEmail('');
                        setPassword('');
                        setOldPassword('');
                        toast.success('Profile Updated');
                    }else{
                        const error = await res.json();
                        toast.error(error.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
    }
  return (
    <Layout>
         <div className='lg:mx-[2rem] p-[1rem] mt-[3rem] rounded-[.5rem] flex flex-col'>
                <h1 className='text-[4rem] lg:my-[1rem] my-[.5rem]'>Your Profile</h1>
             
              <form action={updateUser} className='flex flex-col gap-[1rem] mt-[1rem]'>

                  <div className='flex items-center gap-[1rem]'>
                      <img src={imagePreview ? imagePreview : userInfo?.avatar} alt={userInfo?.name} className='w-[8rem] h-[8rem] rounded-full'/>
                      <button type='button' className='' onClick={() => ref.current?.click()}>(Choose file)</button>
                      <input type="file" ref={ref} name="avatar" id="avatar" className='hidden' onChange={handleImageChange}/>
                  </div>

                  <div className='flex flex-col'>
                       <label className='text-[1rem] pb-[.2rem]' htmlFor='name'>Name</label>
                       <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} className='border border-black p-[.5rem] lg:w-[50%] w-full rounded-[.5rem]'/>
                  </div>

                  <div className='flex flex-col'>
                       <label className='text-[1rem] pb-[.2rem]' htmlFor='email'>Email</label>
                       <input type="text" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} className='border border-black p-[.5rem] lg:w-[50%] w-full rounded-[.5rem]'/>
                  </div>

                  <div className='flex flex-col'>
                       <label className='text-[1rem] pb-[.2rem]' htmlFor='old_password'>Old Password</label>
                       <input value={oldPassword} type="password" name="old_password" id="old_password" className='border border-black p-[.5rem] lg:w-[50%] w-full rounded-[.5rem]' onChange={(e) => setOldPassword(e.target.value)} />
                  </div>

                  <div className='flex flex-col'>
                       <label className='text-[1rem] pb-[.2rem]' htmlFor='password'>New Password</label>
                       <input type="password" value={password} name="password" id="password" className='border border-black p-[.5rem] lg:w-[50%] w-full rounded-[.5rem]' onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <SubmitBtn />
            </form>
         </div>
    </Layout>
  )
}

export default ProfilePage