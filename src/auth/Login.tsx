import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useStore } from '../store/store';
import { useFormStatus } from 'react-dom';
import Loading from '../components/loading';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import toast from 'react-hot-toast';

const SubmitBtn = () => {
  const {pending} = useFormStatus();
  return <button disabled={pending} type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-white bebas">{pending ? <Loading /> : 'Sign in'}</button>
}

const Login = () => {

  let navigate = useNavigate();

  const {setUserInfo, userInfo} = useStore();

    useEffect(() => {
        if(userInfo){
            navigate('/');
        }
    }, [userInfo, navigate])



    const formAction = async (formData: FormData) => {
        try {
            const email = formData.get('email');
            const password = formData.get('password');
            const userData = {
                email,
                password
            }

            if (!email || !password) {
              if (!email) {
                toast.error('Email is required.');
              }
              if (!password) {
                toast.error('Password is required.');
              }
              return;
            }
    
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userData),
            });

            const data = await res.json();
    
            if(res.ok){
                setUserInfo(data);
            }else{
              toast.error('Login failed');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong. Please try again.');
        }
    }

  return (
    
<div className="min-h-screen flex">
  <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-[1.3rem] font-semibold text-black bebas">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={formAction}>
        <div>
          <Label htmlFor="email" className='bebas'>Email address</Label>
          <div className="mt-2">
            <Input  
               type="email"
              name="email"
              id="email"/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className='bebas'>Password</Label>
            <div className="text-[.8rem]">
              <a
                href="#"
                className="font-semibold bebas text-muted-foreground bebas"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Input  
              type="password"
              name="password"
              id="password" 
            />
          </div>
        </div>

        <div>
          <SubmitBtn />
        </div>
      </form>

      <p className="mt-10 text-center text-[.825rem] text-muted-foreground bebas">
        Dont have an account?{' '}
        <a
          href="/register"
          className="font-semibold text-black underline bebas"
        >
          Sign up
        </a>
      </p>
    </div>
  </div>


  <div className="hidden lg:block lg:w-1/2">
    <img
      src="https://images.pexels.com/photos/12628401/pexels-photo-12628401.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Right side illustration"
      className="h-[100vh] w-full object-cover"
    />
  </div>
</div>

  )
}

export default Login;