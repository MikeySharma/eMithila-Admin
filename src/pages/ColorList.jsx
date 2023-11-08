import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { getColors, resetColor, deleteColor } from '../features/color/colorSlice';
import {Link} from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {toast} from 'react-toastify';import CustomModal from '../components/CustomModal';


const ColorList = () => {
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
    },
  ];
  
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteColor(colorId));
  }

  const colorState = useSelector((state)=> state.color);
  const {colors, updatedColor, deletedColor, addedColor, isSuccess, isError} = colorState;
  useEffect(()=>{
    if(addedColor && isSuccess){
      toast.success('Color Added Successfully');
    }else if(deletedColor && isSuccess){
      toast.success('Color Deleted Successfully');
    }else if(updatedColor && isSuccess){
      toast.success('Color Updated Successfully');
    } else if(isError){
      toast.error('Something Went Wrong');
    }
    dispatch(resetColor());
    dispatch(getColors());
  },[addedColor, deletedColor, updatedColor])

  const data = [];
  colors.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.title,
      createdAt: new Date(elem.createdAt).toLocaleString(),
      action: <>
      <div className="flex items-center gap-3">
      <Link to={`../color/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
         setOpen(true);
        setColorId(elem._id);
      }}  >
        <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
      
    });
  })

  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Color List</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Color?"}/>

      
    </div>
  )
}

export default ColorList
