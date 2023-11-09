import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import {Link} from 'react-router-dom';
import {
  FallOutlined,
  MoreOutlined,
  RiseOutlined
} from '@ant-design/icons';
import Chart from '../components/Chart';
import { Table } from 'antd';

const DashBoard = () => {
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
      <div className="grid grid-cols-12 gap-4">
        <div className="sells-stat col-span-4">
          <div className="w-full p-5 rounded-md bg-white">

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium ">Total sells</h3>
              <span><MoreOutlined className="text-xl font-medium" /></span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-0">$1000.88</h3>
              <div className="flex items-end flex-col">
                <div className="flex text-sm font-medium text-green-600 gap-2">
                  <span><RiseOutlined /></span>
                  <span>35%</span>

                </div>
                <p className="text-sm font-normal text-gray-500">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sells-stat col-span-4">
          <div className="w-full p-5 rounded-md bg-white">

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium ">Total sells</h3>
              <span><MoreOutlined className="text-xl font-medium" /></span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-0">$1000.88</h3>
              <div className="flex items-end flex-col">
                <div className="flex text-sm font-medium text-red-600 gap-2">
                  <span><FallOutlined /></span>
                  <span>35%</span>

                </div>
                <p className="text-sm font-normal text-gray-500">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sells-stat col-span-4">
          <div className="w-full p-5 rounded-md bg-white">

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium ">Total sells</h3>
              <span><MoreOutlined className="text-xl font-medium" /></span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-0">$1000.88</h3>
              <div className="flex items-end flex-col">
                <div className="flex text-sm font-medium text-green-600 gap-2">
                  <span><RiseOutlined /></span>
                  <span>35%</span>

                </div>
                <p className="text-sm font-normal text-gray-500">Compared to April 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-medium">Income Statics</h3>
     <Chart/>
     <h3 className="mb-4 text-2xl font-medium">Recent Orders</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    </div>
  )
}

export default DashBoard
