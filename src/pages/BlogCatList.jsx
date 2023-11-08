import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { deleteBlogCat, getBlogCatList, resetBlogCat } from '../features/blogCategory/blogCatSlice';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import CustomModal from '../components/CustomModal';

const BlogCatList = () => {
  const dispatch = useDispatch();
  
 const [open, setOpen] = useState(false);
    const [blogCatId, setBlogCatId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteBlogCat(blogCatId));
  }

  const blogCatState = useSelector((state)=> state.blogCat);
  const {blogCats, isSuccess, isError, updatedBlogCat, deletedBlogCat, addedBlogCat} = blogCatState;
  useEffect(()=>{
    if(updatedBlogCat && isSuccess){
      toast.success('Blog Category Updated Successfully');
    }else if(addedBlogCat && isSuccess){
      toast.success('Blog Category Added Successfully');
    }else if(deletedBlogCat && isSuccess){
      toast.success('Blog Category Deleted Successfully');
    }else if(isError){
      toast.error('Something went wrong');
    }
    dispatch(resetBlogCat());
    dispatch(getBlogCatList());
  },[updatedBlogCat, deletedBlogCat, addedBlogCat])

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
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const data = [];

  blogCats.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.title,
      createdAt: new Date(elem.createdAt).toLocaleString(),
      action: <>
      <div className="flex items-center gap-3">
      <Link to={`../blog-category/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
        setOpen(true);
        setBlogCatId(elem._id);
      }}>
        <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
      
    });
  })
   



  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Blog Category</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Brand Category?"}/>
      
    </div>
  )
}

export default BlogCatList
