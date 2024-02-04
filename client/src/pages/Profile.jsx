import { useSelector } from 'react-redux';
import { useRef ,useState , useEffect } from 'react';
import {
  getDownloadURL, 
  getStorage ,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
const fileRef = useRef(null);
const {currentUser} = useSelector((state) => state.user);
const [file , setFile] = useState(undefined);
const [filePerc, setFilePerc] = useState(0);
const [fileUploadError, setFileUploadError] = useState(false);
const [formData, setFormData] = useState({});




//firebase storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/ .*')

useEffect(() => {
  if(file){
    handleFileUpload(file) ;
  }
}, [file]) ;

const handleFileUpload = (file) => {
  const storage =getStorage(app);
  const fileName = new Date().getTime() + '-' + file.name;
  const storageRef = ref(storage ,fileName);
  const uploadTask = uploadBytesResumable(storageRef ,file);

  uploadTask.on('state_changed' ,
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setFilePerc(Math.round(progress));

  },

  (error) => {
    setFileUploadError(true);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

      setFormData({...formData , avatar: downloadURL});
    }
    );
}
    );

  

}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>

      <form className='flex flex-col gap-4'>

        <input onChange={(e) => setFile(e.target.files[0])}  type='file'  ref={fileRef} hidden accept='image/*' />
     
      <img onClick= {() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt={currentUser.name} title={currentUser.name}
      className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' />

    <p>
      {fileUploadError ? (
      <span className='text-red-700 '>Error Image upload
      </span> 
     ) : filePerc  > 0 && filePerc < 100 ? (
        <span className='text-slate-700'>
          {`Uploading ${filePerc}%`}
        </span>
        ) :
        filePerc === 100 ? (
          
          <span className='text-green-700'>
            Image Successfully Upload
          </span>
        )  :( '' )
      } 

    </p>


      <input type='text' placeholder='username' id='username' className='border  p-3 rounded-lg' />

      <input type='email' placeholder='email' id='email' className='border  p-3 rounded-lg' />

      <input type='text' placeholder='password' id='password' className='border  p-3 rounded-lg' />

      <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase opacity-95'>Update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>

        <span className='text-red-700 cursor-pointer'>Sign out</span>

      </div>
      </div>
  )
  }
