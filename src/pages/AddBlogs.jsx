import { useEffect,useState } from 'react';
import Dropzone from 'react-dropzone';
import {deleteImg, resetUpload, uploadBlogImg} from '../features/upload/uploadSlice';
import {useFormik} from 'formik';
import * as yup from 'yup';
import JoditEditor from 'jodit-react';
import crossIcon from '../assets/cross.svg';
import {useDispatch, useSelector} from 'react-redux';
import {getBlogCatList} from '../features/blogCategory/blogCatSlice';
import {toast } from 'react-toastify';
import { addBlog, getABlog, resetgetBlogImage, updateBlog, resetBlog } from '../features/blog/blogSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const AddBlogs = () => {
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const blogId = location.pathname.split('/')[3];
    const img = [];
    const [images, setImages] = useState();

    useEffect(()=>{
        if(blogId !== undefined){
            dispatch(getABlog(blogId));
        }
    },[blogId])

    useEffect(()=>{
        dispatch(getBlogCatList());
    },[])
    const blogState = useSelector((state)=> state.blog);
    const blogCatState = useSelector((state)=> state.blogCat.blogCats);
    const imageState = useSelector((state) => state.upload);

    const {isLoading, isError, isSuccess, blogImages, message} = imageState;
    const {getBlogCat, getBlogTitle, getBlogDesc, getBlogImage} = blogState;

   let blogSchema = yup.object({
    title: yup.string().required('Title  must required'),
    description: yup.string().required('Description  must required'),
    category: yup.string().required('Category must required'),
    images: yup.array().required('Images must required'),
   })
   const formik = useFormik({
    enableReinitialize: blogId !== undefined ? true : false,
    initialValues: {
        title: getBlogTitle ? getBlogTitle : '',
        description:getBlogDesc ? getBlogDesc : '',
        category:getBlogCat ? getBlogCat : '',
        images: getBlogImage ? getBlogImage : blogImages || '',
    },
    validationSchema: blogSchema,
    onSubmit: value =>{
        if(blogId !== undefined){
            dispatch(updateBlog({blogId, value}));  
        }else{
               dispatch(addBlog(value));
        }
        formik.resetForm();
        navigate('../blog-list');

    }
   })

   useEffect(() => {
    if(blogImages && isSuccess){
        blogImages.map((elem) => {
         img.push({
            url: elem.url,
            public_id: elem.public_id,
            })
        })
        setImages(img);
    }else{
        img.push({});
        setImages(null);
    }
       
  
}, [blogImages]);


 useEffect(()=>{
    img.push(getBlogImage);
    setImages(getBlogImage);

},[ getBlogImage])

useEffect(()=>{
    formik.values.images = img;
},[blogImages, getBlogImage])


 const removeImg =(elem)=>{
    if(getBlogImage){
        dispatch(resetgetBlogImage());
        dispatch(resetUpload())
    } 
     dispatch(deleteImg(elem));
 }


    return (
        <div>
            <h3 className="my-5 text-2xl font-medium">{blogId !== undefined ? "Update" : "Add"} Blog</h3>
         

            <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                <input type="text" placeholder='Enter Blog Title' name="title" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                <div className="error mb-4">
                    { formik.touched.title && formik.errors.title  }
                </div>
                <select name="category" className="w-full border-2 border-gray-400 input-outline p-2 rounded-md mb-4 bg-white text-gray-500" onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} value={formik.values.category} >
                    <option hidden>Select Blog Category</option>
                    {
                        blogCatState.map((elem)=> <option value={elem.title} key={elem._id}>{elem.title}</option>)
                    }
                    </select>
                    <div className="error mb-2">
                        {formik.touched.category && formik.errors.category}

                    </div>
                <div className=" bg-white mb-2">
                    <JoditEditor name="description" onChange={formik.handleChange('description')}  value={formik.values.description}/>
              
                </div>
                <div className="error mb-4">
                { formik.touched.description && formik.errors.description }
                </div>
                <div className="bg-white rounded-md border-2 border-gray-300 h-28 flex items-center justify-center w-full p-4">
                    <Dropzone onDrop={acceptedFiles => {
                        dispatch(uploadBlogImg(acceptedFiles));
                       
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="cursor-pointer">Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="flex items-center mt-4 gap-2 flex-wrap">
                  { 
                    images && images?.map((elem, index)=> {
                        return (
                            <div key={index}>
                                <div className="bg-white p-1 h-fit rounded-md border-2 border-gray-300 relative">
                                    <div className="images f-fit ">
                                        <img className="h-32 w-32" src={elem.url} alt="product image" />
                                        <button onClick={() => {
                                            removeImg(elem.public_id);
                                        }} type="button" className="h-fit absolute top-0 right-0 bg-white overflow-hidden rounded-md "><img className="h-8 w-8" src={crossIcon} alt="cross Icon" /></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
               
              }
                </div>


            <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{blogId !== undefined ? "Update" : "Add"} Blog</button>
            </form>
        </div>
    )
}

export default AddBlogs
