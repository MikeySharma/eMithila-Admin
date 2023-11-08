import {useFormik} from 'formik';
import * as yup from 'yup';
import { addColor, getAColor, updateColor } from '../features/color/colorSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import{useEffect} from 'react';

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const colorId = location.pathname.split('/')[3];

  useEffect(() => {
    if(colorId !== undefined){
    dispatch(getAColor(colorId))
    }
  }, [colorId])

  const colorName = useSelector((state)=> state.color.getColor);

  let colorSchema = yup.object({
    title: yup.string().required('Color is required'),
  })

  const formik=useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName ? colorName : '',
    },
    validationSchema: colorSchema,
    onSubmit: value =>{
      if(colorName !== undefined){
        dispatch(updateColor({colorId, value}))
      }else{
      dispatch(addColor(value))
      }
      formik.resetForm();
      navigate('../color-list');

    }
  })

    return (
      <div>
              <h3 className="my-5 text-2xl font-medium">{colorName !== undefined ? "Update" : "Add"} Color</h3>
              <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                  <input type="color" placeholder='Enter Color ' name="title" className="w-full h-12 input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                  <div className="error">
                    { formik.touched.title && formik.errors.title }
                  </div>
          
              <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{colorName !== undefined ? "Update" : "Add"}  Color</button>
              </form>
      </div>
    )
  }
  
  export default AddColor
  