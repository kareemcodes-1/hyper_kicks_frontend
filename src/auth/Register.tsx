
import { useNavigate } from 'react-router';
import { useStore } from '../store/store';
import { useFormStatus } from 'react-dom';
import Loading from '../components/loading';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const SubmitBtn = () => {
  const {pending} = useFormStatus();
  return <button disabled={pending} type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-white">{pending ? <Loading /> : 'Sign up'}</button>
}

const Register = () => {
    let navigate = useNavigate();

    const {setUserInfo} = useStore();

    const formAction = async (formData: any) => {
        try {
            const userData = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            }
    
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
    
            if(res.ok){
                setUserInfo(data);
                navigate('/');
            }else{
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
<div className="min-h-screen flex">
  <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-[1.3rem] azert-mono font-semibold text-black">
        Sign up to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action={formAction}>

      <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
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
        <Label htmlFor="email">Email address</Label>
          <div className="mt-2">
            <Input  
               type="email"
              name="email"
              id="email"/>
            </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-gray-600"
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

      <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account?{' '}
        <a
          href="/auth/login"
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