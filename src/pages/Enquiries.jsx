import{ useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { delEnqs, getEnqs, resetEnq, updateEnq } from '../features/enquiries/enquiriesSlice';
import {Link} from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {toast} from 'react-toastify';
import {EyeOutlined} from '@ant-design/icons';
import CustomModal from '../components/CustomModal';

const Enquiries = () => {

  const columns = [
    {
      title: 'S.N.',
      dataIndex: 'key',
    },{
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },{
      title: 'Comment',
      dataIndex: 'comment',
    },{
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },{
      title: 'Action',
      dataIndex: 'action',
    }
  ];

  const dispatch = useDispatch();
 
  const enqState = useSelector((state)=> state.enq);
  const {enqs, updatedEnq, deletedEnq, isSuccess, isError} = enqState;


 const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState();
  const hideModal = () => {
  setOpen(false);
  };
  const performAction = ()=>{
    setOpen(false);
    dispatch(delEnqs(enqId));
  }
  useEffect(()=> {
     if(deletedEnq && isSuccess){
       dispatch(resetEnq());
      toast.success('Enquiry Deleted Successfully');
    }else if(updatedEnq && isSuccess){
      dispatch(resetEnq());
      toast.success('Enquiry Updated Successfully');
    }else if(isError){
      toast.error('Something went wrong');
    }
    dispatch(getEnqs());
  },[deletedEnq, updatedEnq])

  useEffect(()=>{
    dispatch(getEnqs());
  },[])

  const handleStatus=(value, id)=>{
  if(id !== undefined){
    const data = {id : id, status: value};
    dispatch(updateEnq(data));
  }
    
  }
  
  const data = [];
  enqs && enqs.map((elem,index)=>{
    data.push({
      key: index + 1,
      name: elem.name,
      email: elem.email,
      comment: elem.comment,
      phone: elem.mobile,
      status: <>
        <span className="text-md font-medium">
              <select name="status" defaultValue={elem.status ? elem.status : 'Submited'} onChange={(e)=> handleStatus(e.target.value, elem._id)}>
                <option value="Submited">Submited</option>
                <option value="Contacted">Contacted</option>
                <option value="InProgress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
        </span>
      </>,
      action: <>
      <div className="flex items-center gap-3 ">
      <Link className="flex items-center" to={`../enquiry/${elem._id}`}>
      <EyeOutlined className="text-xl mb-0" />
      </Link>
      <button type="button" onClick={()=>{
         setOpen(true);
        setEnqId(elem._id);
      }}>
        <img className="h-6" src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
    });
  })

  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Enquiries</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Enquiry?"}/>
      
    </div>
  )
}

export default Enquiries
