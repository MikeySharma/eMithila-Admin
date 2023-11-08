import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { addBrand, getABrand, resetBrand, updateBrand } from '../features/brand/brandSlice';
import {useNavigate, useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
import {useEffect} from 'react';



const AddBrand = () => {

  const dispatch = useDispatch();
  const navigate= useNavigate();
  const location = useLocation();

  const brandId = location.pathname.split('/')[3];
  
  let brandSchema = yup.object({
    title: yup.string().required("Brand is must required"),
  })
  const brandName = useSelector((state)=> state.brand.getBrand);
  useEffect(()=>{
    if(brandId !== undefined){
    dispatch(getABrand(brandId));
    }else{
    dispatch(resetBrand());
    }

  },[brandId])

   const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: brandSchema,
    onSubmit: value =>{
      if(brandId !== undefined){
         dispatch(updateBrand({brandId, value}));
      }else{
      dispatch(addBrand(value));
    }

     formik.resetForm();
        navigate('../brand-list');
    }
   })

    return (
      <div>
              <h3 className="my-5 text-2xl font-medium">{brandId !== undefined ? "Update" : "Add"} Brand</h3>

              <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                  <input type="text" placeholder='Enter Brand' name="title" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                  <div className="error">
                  { formik.touched.title && formik.errors.title   }
                  </div>
                  
          
              <button type="submit" className="py-1 px-2 mt-8 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{brandId !== undefined ? "Update" : "Add"} Brand</button>
              </form>
      </div>
    )
  }
  
  export default AddBrand
  