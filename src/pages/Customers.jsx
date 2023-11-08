import {useEffect} from 'react';
import { Table } from 'antd';
import { getUsers } from '../features/customer/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
const columns = [
    {
      title: 'S.N.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    ,{
      title: 'userId',
      dataIndex: 'id',
    }
  ];

const Customers = () => {  


  const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getUsers());
  },[])
  const customerState = useSelector((state)=> state.customer.customers);
  const data1 = [];

  Array.from(customerState).filter((user)=>  user.role !== 'admin').map((elem, index)=>{
      data1.push({
        key: index + 1,
        name: `${elem.firstname} ${elem.lastname}`,
        email: `${elem.email}`,
        mobile: `${elem.mobile}`,
        id: elem._id
        
      });
  });
 


  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Customers</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data1} />
    </div>
      
    </div>
  )
}

export default Customers
