import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useNavigate, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getCategory } from '../features/category/categorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from 'antd';
import Dropzone from 'react-dropzone';
import { deleteImg,  uploadImg, resetUpload } from '../features/upload/uploadSlice';
import crossIcon from '../assets/cross.svg';
import {  uploadProduct, getAProduct, updateProduct, resetgetPImage } from '../features/product/productSlice';
import JoditEditor from 'jodit-react';
import {toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';

const AddProduct = () => {
   
   const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {Option} = Select;
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
 
    const [color, setColor] = useState([]);
    const img = [];
    const [images, setImages] = useState();

    const productId = location.pathname.split('/')[3];
    const colorValue = [];

   

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getColors())
        dispatch(getCategory())
    }, [])

    useEffect(()=>{
    if(productId !== undefined){
        dispatch(getAProduct(productId));
    }
    },[productId])

    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector((state) => state.category.categories);
    const colorState = useSelector((state) => state.color.colors);
    const imageState = useSelector((state) => state.upload);
    const productState = useSelector((state)=> state.product);


    const {isLoading, isError, isSuccess, productImages, message} = imageState;
     const {getPBrand, getPCategory, getPColor, getPDesc, getPImage, getPPrice, getPQuantity, getPTag, getPTitle} = productState;
     const getColorSuccess = productState.isSuccess; 
    let productSchema = yup.object({
        title: yup.string().required('Title required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Product Price is required'),
        category: yup.string().required('Category is required'),
        brand: yup.string().required('Brand is required'),
        tags: yup.string().required('Tags must required'),
        color: yup.array().min(1, 'Select at least one color'),
        quantity: yup.number().required('Quantity is required'),
        images: yup.array().required('Images is required'),
    })

    const formik = useFormik({
        enableReinitialize: productId !== undefined ? true : false,
        initialValues: {
            title:  getPTitle ? getPTitle : '',
            description:  getPDesc ? getPDesc : '',
            price:  getPPrice ? getPPrice : '',
            category:  getPCategory ? getPCategory : '',
            brand:  getPBrand ? getPBrand : '',
            tags:  getPTag ? getPTag :  '',
            color:  color ? color : getPColor ,
            quantity:  getPQuantity ? getPQuantity : '',
            images: getPImage ? getPImage : productImages || '',
        },
        validationSchema: productSchema,
        onSubmit: value => {
            if(productId !== undefined){
                dispatch(updateProduct({productId, value}))
            }else {
             dispatch(uploadProduct(value));
            }
            formik.resetForm();
            setColor([]);
            navigate('../product-list');
        }

    })


    const optColor = []
    colorState.map((elem) => {
        if(productId == undefined){
            optColor.push({
                key: elem._id,
                value: elem.title,
            })
        }else{
            optColor.push({
                label: elem.title,
                value: elem.title
            })
        }
       
    })


    const handleColorValue =(e)=>{
        if(productId === undefined){
              colorValue.push(e);
        formik.setFieldValue('color', colorValue);

        }
      
    }

    useEffect(()=>{
        if(getPColor && getColorSuccess){
        setColor(getPColor);
        colorValue.push(getPColor);
        formik.values.color = color;
        }
    },[getPColor])

    useEffect(() => {
    if(productImages && isSuccess){
        productImages.map((elem) => {
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
       
  
}, [productImages]);


 useEffect(()=>{
    img.push(getPImage);
    setImages(getPImage);

},[ getPImage])

useEffect(()=>{
    formik.values.images = img;
},[productImages, getPImage])

 const removeImg =(elem)=>{
    if(getPImage){
        dispatch(resetgetPImage());
        // dispatch(resetUpload())
    } 
     dispatch(deleteImg(elem));
 }



    return (
        <div>
            <h3 className="my-5 text-2xl font-medium">{productId !== undefined ? "Update" : "Add"} Product</h3>

            <form className="my-4" action="" onSubmit={formik.handleSubmit}>
                <input type="text" placeholder='Enter Product Title' name="title" className="w-full input-outline p-2 rounded-sm mb-2  bg-white text-gray-500" onChange={formik.handleChange('title')} onBlur={formik.handleBlur('title')} value={formik.values.title} />
                <div className="error mb-2">
                    {formik.touched.title && formik.errors.title}
                </div>
                <div className=" bg-white mb-2">
                    <JoditEditor name='description' onChange={formik.handleChange('description')} value={formik.values.description} />
                </div>
                <div className="error mb-2">
                    {formik.touched.description && formik.errors.description}
                </div>
                <input type="number" placeholder='Enter Product Price in $' name="price" className="w-full input-outline p-2 rounded-sm mb-2  bg-white text-gray-500" onChange={formik.handleChange('price')} onBlur={formik.handleBlur('price')} value={formik.values.price} />
                <div className="error mb-2">
                    {formik.touched.price && formik.errors.price}
                </div>

                <select name="brand" className="w-full h-8 p-2 rounded-md text-gray-400  input-outline mb-4 " onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')} value={formik.values.brand}>
                    <option hidden>Select Brand</option>
                    {
                        brandState.map((elem) => <option key={elem._id} value={elem.title}>{elem.title}</option>)
                    }
                </select>
                <div className="error mb-2">
                    {formik.touched.brand && formik.errors.brand}
                </div>
                <select name="tags" className="w-full h-8 p-2 rounded-md text-gray-400  input-outline mb-4 " onChange={formik.handleChange('tags')} onBlur={formik.handleBlur('tags')} value={formik.values.tags}>
                    <option hidden>Select Tag</option>
                   <option value="featured">Featured</option>
                   <option value="special">Special</option>
                   <option value="popular">Popular</option>
                </select>
                <div className="error mb-2">
                    {formik.touched.tags && formik.errors.tags}
                </div>
                <select name="category" className="w-full h-8 p-2 rounded-md text-gray-400 input-outline mb-4" onChange={formik.handleChange('category')} onBlur={formik.handleBlur('category')} value={formik.values.category}>
                    <option hidden>Select Category</option>
                    {
                        categoryState.map((elem) => <option key={elem._id} value={elem.title}>{elem.title}</option>)
                    }
                </select>
                <div className="error mb-2">
                    {formik.touched.category && formik.errors.category}
                </div>
                <div className="mb-4">
                {productId === undefined ? (
                  <Select
                       
                        id="color"
                        key="color"
                        mode="multiple"
                        placeholder="Select Color"
                        allowClear
                        value={color}
                        onChange={(e) => {
                           setColor(e);
                            handleColorValue(e);
                            formik.handleChange('color');
                        }}
                        onBlur={formik.handleBlur('color')}
                        className='w-full input-outline'
                      > 
                                                          
                        {optColor && optColor.map((option) => (
                        <Option key={option.key} value={option.value}>
                          {option.value}
                        </Option>
                      ))}
                    </Select>) : 
                    (<Select
                       
                        id="color"
                        key="color"
                        mode="multiple"
                        placeholder="Select Color"
                        allowClear
                        defaultValue={color}
                        onChange={(e) => {
                           setColor(e);
                            formik.handleChange('color');
                        }}
                        onBlur={formik.handleBlur('color')}
                        className='w-full input-outline'
                        options={optColor}
                      /> ) }
                </div>

                <div className="error mb-2">
                    {formik.touched.color && formik.errors.color}
                </div>
                <input type="number" placeholder='Enter Quantity' name="quantity" className="w-full input-outline p-2 rounded-sm mb-2  bg-white text-gray-500" onChange={formik.handleChange('quantity')} onBlur={formik.handleBlur('quantity')} value={formik.values.quantity} />
                <div className="error mb-2">
                    {formik.touched.quantity && formik.errors.quantity}
                </div>
                <div className="bg-white rounded-md border-2 border-gray-300 h-28 flex items-center justify-center w-full p-4">
                    <Dropzone onDrop={acceptedFiles => {
                        dispatch(uploadImg(acceptedFiles));
                       
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
                    {images && images.map((elem, index) => {
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
                    })}

                </div>



                <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{productId !== undefined ? "Update" : "Add"} Product</button>
            </form>
        </div>
    )
}

export default AddProduct
