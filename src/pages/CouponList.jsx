import  { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { deleteCoupon, getCoupons ,resetCoupon} from '../features/coupon/couponSlice';
import {Link} from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {toast} from 'react-toastify';
import CustomModal from '../components/CustomModal';

const CouponList = () => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState();

  const hideModal = () => {
    setOpen(false);
  };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteCoupon(couponId));
  }
  const couponState = useSelector((state)=> state.coupon);
  const {coupons, addedCoupon, deletedCoupon, updatedCoupon, isError, isSuccess} = couponState;

  useEffect(()=>{
    if(addedCoupon && isSuccess){
      toast.success('Coupon Added Successfully');
    }else if(deletedCoupon && isSuccess){
      toast.success('Coupon Deleted Successfully');
    }else if(updatedCoupon && isSuccess){
      toast.success('Coupon Updated Successfully');
    }else if(isError){
      toast.error('Something went wrong');
    }
    dispatch(resetCoupon());
    dispatch(getCoupons());
  },[addedCoupon, deletedCoupon, updatedCoupon])

  const columns = [
    {
      title: 'S.N.',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const data = [];

  coupons.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.name,
      expiry: new Date(elem.expiry).toLocaleDateString(),
      discount: elem.discount,
      action: <>
      <div className="flex items-center gap-3">
      <Link to={`../coupon/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
        setOpen(true);
        setCouponId(elem._id);
      }}>
        <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
    });
  })
    

  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Coupon List</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Coupon?"}/>
      
    </div>
  )

}

export default CouponList
