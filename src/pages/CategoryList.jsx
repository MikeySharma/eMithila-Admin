import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteCategory, getCategory, resetCat } from '../features/category/categorySlice';
import { Table } from 'antd';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import CustomModal from '../components/CustomModal';

const CategoryList = () => {
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
      title: 'CreatedAt',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    }
  ];
  const data = [];
 
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteCategory(brandId));
  }


  const categoryState = useSelector((state)=> state.category);
  const {categories, newCat, isSuccess, isError, deletedCat, uploadCat} = categoryState;


  useEffect(()=>{
    if(newCat && isSuccess){
      toast.success('Category Added Successfully')
    } else if(deletedCat && isSuccess){
        toast.success('Category Deleted Successfully');
    } else if(isError){
      toast.error('Something Went Wrong');
    } else if(uploadCat && isSuccess){
      toast.success('Category Updated Successfully');
    }
    dispatch(getCategory());
    dispatch(resetCat());
    
  },[newCat, deletedCat, uploadCat])

  categories.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.title,
      createdAt: new Date(elem.createdAt).toLocaleString(),
      action: <>
      <div className="flex items-center gap-3">
      <Link to={`../category/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
        setOpen(true);
        setBrandId(elem._id);
      }}  >
        <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
      
    });
  })
    
  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Category List</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Product Category?"}/>
      
    </div>
  )
}

export default CategoryList
