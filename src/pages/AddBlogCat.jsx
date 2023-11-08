import {useFormik} from 'formik';
import * as yup from 'yup';
import { addBlogCat, getABlogCat } from '../features/blogCategory/blogCatSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useEffect} from 'react';

const AddBlogCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const blogCatId = location.pathname.split('/')[3];

  useEffect(()=>{
    if(blogCatId !== undefined){
      dispatch(getABlogCat(blogCatId));
    }
  },[blogCatId])

  const blogCatName = useSelector((state)=> state.blogCat.getBlogCat);

  let blogCatSchema = yup.object({
    title: yup.string().required('Blog Category must required'),
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName ? blogCatName : '',
    },validationSchema: blogCatSchema,
    onSubmit: (value)=>{
      if(blogCatName !== undefined){
        dispatch(updateBlogCat({blogCatId, value}));
      }else{
      dispatch(addBlogCat(value));
      }
      formik.resetForm();
      navigate('../blog-category-list');
    }
  })
  return (
    <div>
            <h3 className="my-5 text-2xl font-medium">{blogCatId ? "Update" : "Add"} Blog Category</h3>
            <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                <input type="text" placeholder='Enter Blog Category' name="title" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                <div className="error mb-2">
                { formik.touched.title && formik.errors.title}
                </div>
        
            <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{blogCatId ? "Update" : "Add"} Blog Category</button>
            </form>
    </div>
  )
}

export default AddBlogCat
