import{ useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { 
  signInStart , 
  signInSuccess ,
  signInFailure
  } from '../redux/User/userSlice'

export default function Signin() {
const[formData,setFormData] = useState({});
const {loading,error} = useSelector((state )=> state.user);
const navigate = useNavigate();
const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value});
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    dispatch(signInStart());
    const res = await fetch('/api/auth/signin',
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
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
  }catch(error){
    dispatch(signInFailure(error.message));
  }
   
    
  };
 

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Signin</h1>
      <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" placeholder='email' id="email" 
        className='border p-3 rounded' onChange={handleChange}/>
        <input type="password" placeholder='password' 
        className='border p-3 rounded' id="password" onChange={handleChange}/>
        <button disabled={loading} className=' bg-slate-500 text-white p-3  rounded-lg uppercase hover:opacity-50 disabled:opacity-80' id="signin">
          {loading ? 'Loading...' : 'Signin'}
          </button>
      </form>

      <div className='flex gap-3 mt-5'> 
        <p>Don't have an account?</p>
        <Link to='/sign-up' className='text-blue-700 hover:underline'>Signup</Link>

      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}
