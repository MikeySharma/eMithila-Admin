import {useFormik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {addCoupons, getACoupon, updateCoupon} from '../features/coupon/couponSlice';
import {useEffect} from 'react';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const couponId = location.pathname.split('/')[3];
  useEffect(()=>{
    if(couponId !== undefined){
        dispatch(getACoupon(couponId));
    }
  },[couponId])

  //Format Date Function
  const formatDate = (elem)=>{
    const input = new Date(elem).toLocaleDateString().split('/');
    const [month, day, year] = input;
    const newDate = [year,month,day].join('-');
    return newDate;
   
  }

  const couponState = useSelector((state)=> state.coupon)
  const {getCoupon, getCouponName , getCouponExpiry, getCouponDiscount} = couponState;

  let couponSchema = yup.object({
    name: yup.string().required('Coupon Name must required'),
    expiry: yup.date().required('Expiry date  must required'),
    discount: yup.number().min(1,"Discount Amount can't be less than 1").max(999, "Discount Amount can't be more than 999").required('Discount Amount Must requierd'),
   })
   const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        name: getCouponName || '',
        expiry: formatDate(getCouponExpiry) || '',
        discount: getCouponDiscount || '',
    },
    validationSchema: couponSchema,
    onSubmit: value =>{
        if(couponId !== undefined){
            dispatch(updateCoupon({couponId, value}))
        }else{
        dispatch(addCoupons(value));
        }
        formik.resetForm();
        navigate('../coupon-list');
    }
   })

  return (
    <div>
    <h3 className="my-5 text-2xl font-medium">{couponId !== undefined ? "Update" : "Add"} Coupon</h3>
 

    <form className="my-4" action="" onSubmit={formik.handleSubmit}>
        <input type="text" placeholder='Enter Coupon Name' name="name" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('name')} onBlur={formik.handleBlur('name')} value={formik.values.name} />
        <div className="error mb-4">
            { formik.touched.name && formik.errors.name  }
        </div>
        <input type="date" placeholder='Enter Expiry Date' name="expiry" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('expiry')} onBlur={formik.handleBlur('expiry')} value={formik.values.expiry} />
        <div className="error mb-4">
            { formik.touched.expiry && formik.errors.expiry  }
        </div>
        <input type="number" min="1" max="999" placeholder='Enter Discount Amount' name="discount" className="w-full input-outline p-2 rounded-md mb-4 border-2 border-gray-400 bg-white text-gray-500" onChange={formik.handleChange('discount')} onBlur={formik.handleBlur('discount')} value={formik.values.discount} />
        <div className="error mb-4">
            { formik.touched.discount && formik.errors.discount  }
        </div>
       
      
       


    <button type="submit" className="py-1 px-2 mt-4 rounded-sm text-white hover:bg-blue-700 bg-blue-500">{couponId !== undefined ? "Update" : "Add"} Coupon</button>
    </form>
</div>
  )
}

export default AddCoupon
