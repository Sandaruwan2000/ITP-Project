import{ useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
const[formData,setFormData] = useState({});
const[error,setError] = useState(null);
const[loading,setLoading] = useState(false);
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setLoading(true);
    const res = await fetch('/api/auth/signup',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),

    });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
  }catch(error){
    setLoading(false);
    setError(error.message);
  }
   
    
  };
 

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
      <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' id="username"
         className='border p-3 rounded' onChange={handleChange} />
        <input type="email" placeholder='email' id="email" 
        className='border p-3 rounded' onChange={handleChange}/>
        <input type="password" placeholder='password' 
        className='border p-3 rounded' id="password" onChange={handleChange}/>
        <button disabled={loading} className=' bg-slate-500 text-white p-3  rounded-lg uppercase hover:opacity-50 disabled:opacity-80' id="signin">
          {loading ? 'Loading...' : 'Signup'}
          </button>
          <OAuth />
      </form>

      <div className='flex gap-3 mt-5'> 
        <p>Have an account?</p>
        <Link to='/sign-in' className='text-blue-700 hover:underline'>Signin</Link>

      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}
