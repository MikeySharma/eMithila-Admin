import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import { addCategory, getACategory, resetCat, updateCategory } from '../features/category/categorySlice';
import {toast} from 'react-toastify';
import {useEffect} from 'react';
const AddCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const catId = location.pathname.split('/')[3];

 useEffect(()=>{
    if(catId !== undefined){
    dispatch(getACategory(catId));
    }else {
      dispatch(resetCat());
    }
  },[catId])

  const catName = useSelector((state)=> state.category.getCat);


  let catSchema = yup.object({
    title: yup.string().required('Category is must required')
  })

 
  const formik = useFormik({
    enableReinitialize: catId !== undefined ? true : false,
    initialValues: {
      title: catId !==undefined ? catName.title : "",
    },
    validationSchema: catSchema,
    onSubmit: value =>{
      if(catId !== undefined){
        dispatch(updateCategory({catId, value}))
      }else{
      dispatch(addCategory(value));
      }
      navigate('../category-list');
      formik.resetForm();
    }
  })




    return (
      <div>
              <h3 className="my-5 text-2xl font-medium">{catId !== undefined ? "Update" : "Add"} Category</h3>
              <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                  <input type="text" placeholder='Enter  Category' name="title" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                  <div className="error">
                    { formik.touched.title && formik.errors.title}
                  </div>
                  
          
              <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{catId !== undefined ? "Update" : "Add"}  Category</button>
              </form>
      </div>
    )
  }
  
  export default AddCat
  