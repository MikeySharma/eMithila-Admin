import { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetProduct } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {toast} from 'react-toastify';
import {resetUpload} from '../features/upload/uploadSlice';
import CustomModal from '../components/CustomModal';



const ProductList = () => {

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
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'category',
    dataIndex: 'category',
  }, {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  }, {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity,

  },
  {
    title: 'Action',
    dataIndex: 'action',
  }
];

  const dispatch = useDispatch();

  const productState = useSelector((state)=> state.product);
  const imageState = useSelector((state)=> state.upload.productImages);
  const {products, addedProduct, updatedProduct, deletedProduct, isSuccess, isError} = productState;

   const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteProduct(productId));
  }

   useEffect(()=>{
    if(addedProduct && isSuccess){
      toast.success('Product Added Successfully');
      dispatch(resetUpload());
       dispatch(resetProduct());

    }else if(updatedProduct && isSuccess){
      toast.success('Product Updated Successfully');
       dispatch(resetProduct());
      dispatch(resetUpload());

    }else if(deletedProduct && isSuccess){
       dispatch(resetProduct());
      toast.success('Product Deleted Successfully');
    }else if(isError){
      dispatch(resetUpload());
      dispatch(resetProduct());
      toast.error("Something Went Wrong");
    }

      dispatch(getProducts());

  },[ addedProduct, updatedProduct, deletedProduct])
  const data = [];

  products.map((elem, index) => {
    data.push({
      key: index + 1,
      name: elem.title,
      brand: elem.brand,
      category: elem.category,
      price: `$ ${elem.price}`,
      quantity: elem.quantity,
      action: <>
        <div className="flex items-center gap-3">
          <Link to={`../product/${elem._id}`}>
            <img className="h-5" src={editIcon} alt="edit icon" />
          </Link>
          <button type='button' onClick={() => 
            {
                setOpen(true);
                setProductId(elem._id);
              }} >
            <img className="h-6 " src={deleteIcon} alt="delete icon" />
          </button>
        </div>

      </>,

    });
  })

  return (
    <div>
      <h3 className="mb-4 text-2xl font-medium">Product List</h3>
      <div className="mb-5">
        <Table columns={columns} dataSource={data} />
      </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Product?"}/>

    </div>
  )
}

export default ProductList
