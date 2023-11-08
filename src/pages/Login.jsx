import {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../features/auth/authSlice';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = Yup.object({

    email: Yup.string().email('Email must be valid').required('Email Required'),
    password: Yup.string().required('Password Required'),

  });
  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state)=> state.auth)
  const {user, isLoading, isError, isSuccess, message} = authState
  useEffect(()=>{
    if(isSuccess){
      navigate('/admin')
    }else{
      navigate('');
    }
  },[user, isLoading, isError, isSuccess])
  return (
    <div className="login-wrapper py-5  bg-yellow-400">
      <div className="flex items-center " style={{ minHeight: "100vh" }}>

        <div className="my-5 w-1/4 rounded-md overflow-hidden p-5 bg-white mx-auto">
          <form className="flex flex-col  gap-1" action="" onSubmit={formik.handleSubmit}>
          {
            isLoading && <div className="my-2 text-md font-medium text-center">Please wait</div>
          }
            <h4 className='text-xl text-center font-medium'>Login</h4>
            <h6 className='text-sm text-center font-normal'>Login to your account to continue</h6>
            <div className="error text-center">
              {message.message =="Rejected" ? "You are not an Admin" : ""}
            </div>
            <input className="text-gray-400 mt-2 input-outline rounded-md px-2 py-1 w-full border-2 border-gray-200" name="email" type="email" placeholder="Email Address" id="email" onChange={formik.handleChange('email')} value={formik.values.email} onBlur={formik.handleChange('email')} />
            <div className="error">

              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>


            <input className="text-gray-400 mt-2 input-outline rounded-md px-2 py-1 w-full border-2 border-gray-200" name="password" type="password" placeholder="Password" id="password" onChange={formik.handleChange('password')} value={formik.values.password} onBlur={formik.handleChange('password')} />

            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="flex justify-end">

              <Link to="/forgot-password" className='text-end mb-3'>Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full text-center h-fit py-2 rounded-md bg-yellow-400">Login</button>
          </form>


        </div>

      </div>
    </div>
  )
}

export default Login
