
import { useNavigate } from 'react-router';
import { useStore } from '../store/store';
import { useFormStatus } from 'react-dom';
import Loading from '../components/loading';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import toast from 'react-hot-toast';

const SubmitBtn = () => {
  const {pending} = useFormStatus();
  return <button disabled={pending} type="submit" className="bebas flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-white">{pending ? <Loading /> : 'Sign up'}</button>
}

const Register = () => {
    let navigate = useNavigate();

    const {setUserInfo} = useStore();

    const formAction = async (formData: any) => {
        try {
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            const userData = {
                name,
                email,
                password
            }

            if (!name || !email || !password) {
              if (!name) {
                toast.error('Name is required.');
              }
              if (!email) {
                toast.error('Email is required.');
              }
              if (!password) {
                toast.error('Password is required.');
              }
              return;
            }
    
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/register`, {
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
                navigate('/');
            }else{
                toast.error('Register failed');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
<div className="min-h-screen flex">
  <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-[1.3rem]  font-semibold text-black bebas">
        Sign up to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={formAction}>

      <div>
          <label
            htmlFor="name"
            className='bebas'
          >
            Name
          </label>
          <div className="mt-2">
             <Input  
              type="text"
              name="name"
              id="name" 
            />
          </div>
        </div>

        <div>
        <Label htmlFor="email"  className='bebas'>Email address</Label>
          <div className="mt-2">
            <Input  
               type="email"
              name="email"
              id="email"/>
            </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
          <Label htmlFor="password"  className='bebas'>Password</Label>
            <div className="text-[.8rem]">
              <a
                href="#"
                className="font-semibold text-muted-foreground bebas"
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
      Already have an account?{' '}
        <a
          href="/login"
          className="font-semibold text-black underline"
        >
          Sign in
        </a>
      </p>
    </div>
  </div>


  <div className="hidden lg:block lg:w-1/2">
    <img
      src="https://images.pexels.com/photos/5088874/pexels-photo-5088874.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Right side illustration"
      className="h-[100vh] w-full object-cover"
    />
  </div>
</div>
  )
}

export default Register;