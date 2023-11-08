import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify';
import { deleteBrand, getBrands, resetBrand } from '../features/brand/brandSlice';
import CustomModal from '../components/CustomModal';

const BrandList  = () => {
  const dispatch = useDispatch();

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
      title: 'Product',
      dataIndex: 'productId',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
    },{
      title: 'Action',
      dataIndex: 'action',
    }
  ];
 const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteBrand(brandId));
  }

  const brandState = useSelector((state)=> state.brand);
  const {brands, newBrand, deletedBrand, updatedBrand, isSuccess, isError} = brandState
  useEffect(()=>{
    if(newBrand && isSuccess){
      toast.success('Brand Added Successfully')
    } else if(deletedBrand && isSuccess){
        toast.success('Brand Removed Successfully')
    }else if(updatedBrand && isSuccess){
      toast.success('Brand Updated Successfully');
    }else if(isError){
      toast.error('Something went wrong');
    }
    dispatch(getBrands());
    dispatch(resetBrand());
  },[newBrand, deletedBrand, updatedBrand])
 
 const data = [];
  brands.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.title,
      productId: elem._id,
      createdAt: new Date(elem.createdAt).toLocaleString(),
      action: <>
      <div className="flex items-center gap-3">
      <Link to= {`../brand/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
        setOpen(true);
        setBrandId(elem._id);
      }}>
        <img className="h-6" src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
      
    });
  })
  return (
    <div>
       <h3 className="mb-4 text-2xl font-medium">Brand List</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>

    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Brand Category?"}/>
      
    </div>
  )
}

export default  BrandList
