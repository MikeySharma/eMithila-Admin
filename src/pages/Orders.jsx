import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { getOrders } from '../features/auth/authSlice';
import {Link} from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrders());
  },[])

  const orderState = useSelector((state)=> state?.auth?.orders);
  const columns = [
    {
      title: 'S.N.',
      dataIndex: 'key',
    },
    {
      title: 'Order Product',
      dataIndex: 'orderProduct',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
    },{
      title: 'Customer Info',
      dataIndex: 'customerInfo',
    },{
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },{
      title: 'Order Status',
      dataIndex: 'status',
    },{
      title: 'Address',
      dataIndex: 'address',
    } ,{
       title: 'Mobile',
       dataIndex: 'mobile',
     }
  ];
  const data = [];
  orderState && orderState.map((elem,index)=>{
    data.push({
      key: index + 1,
      orderProduct: <Link to={`../view-orders/${elem?._id}`}>View Products Here</Link>, 
      orderDate:new Date(elem.updatedAt).toLocaleString(),
      customerInfo: elem?.shippingInfo?.firstname + " " +elem?.shippingInfo?.lastname,
      totalAmount: '$ ' + elem?.totalpriceAfterDiscount,
      status: elem?.orderStatus,
      address: elem?.shippingInfo?.address + " " + elem?.shippingInfo?.city + " " + elem?.shippingInfo?.country,
      mobile: elem?.userId?.mobile
      // action: <>
      // <div className="flex items-center gap-3">
      // <Link to="/edit">
      // <img className="h-5" src={editIcon} alt="edit icon"/>
      // </Link>
      // <Link to="/delete"  >
      //   <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      // </Link>
      // </div>
      
      // </>,

      
    });
  })
   



  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Orders</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
      
    </div>
  )
}

export default Orders
