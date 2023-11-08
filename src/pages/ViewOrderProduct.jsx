import {useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAOrder} from '../features/auth/authSlice';
import { Table } from 'antd';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';


const ViewOrderProduct = () => {

	const columns = [
    {
      title: 'S.N.',
      dataIndex: 'key',
    },
    {
      title: 'Product Name',
      dataIndex: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },{
      title: 'Count',
      dataIndex: 'count',
    },{
      title: 'Color',
      dataIndex: 'color',
    }
    // },{
    //   title: 'Action',
    //   dataIndex: 'action',
    // }
  ];
  const data = [];


	const dispatch = useDispatch();
	const location = useLocation();

	const orderId = location.pathname.split('/')[3];

	useEffect(()=>{
		if(orderId !== undefined){
			dispatch(getAOrder(orderId));
		}
			
	},[orderId])

	const authState = useSelector((state)=> state.auth);
	const {orderBy} = authState.getOrder
	const {orderItems} = authState.getOrder;


 	orderItems && orderItems.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem?.title,
      brand:elem?.brand,
      count: elem.count,
      color: elem.color,
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

 	const handleUserName = (user)=>{
 		const firstletter = user.slice(0, 1).toUpperCase();
 		const remainingletter = user.slice(1, user.length);
 		return firstletter + remainingletter
 	}


 	

	return (
		<div>
         <h3 className="mb-4 text-2xl font-medium">{orderBy && (handleUserName(orderBy.firstname) + ' ' + handleUserName(orderBy.lastname))} Order</h3>
	     <div className="mb-5">
	       <Table  columns={columns} dataSource={data} />
	    </div>
      
    </div>
	)
}

export default ViewOrderProduct