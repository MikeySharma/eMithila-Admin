import { useEffect,useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Table } from 'antd';
import { deleteBlog, getBlogs, resetBlog } from '../features/blog/blogSlice';
import {Link} from 'react-router-dom';
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import {toast} from 'react-toastify';
import {resetUpload} from '../features/upload/uploadSlice';
import CustomModal from '../components/CustomModal';


const BlogList = () => {
  const dispatch = useDispatch();
  
  const blogState = useSelector((state)=> state.blog);
  const imageState = useSelector((state)=> state.upload.blogImages);
  const {blogs, addedBlog, updatedBlog, deletedBlog, isSuccess, isError} = blogState;

 const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState();
    const hideModal = () => {
    setOpen(false);
     };
  const performAction = ()=>{
    setOpen(false);
    dispatch(deleteBlog(blogId));
  }
  useEffect(()=>{
    if(addedBlog && isSuccess){
      toast.success('Blog Added Successfully');
      dispatch(resetUpload());
       dispatch(resetBlog());

    }else if(updatedBlog && isSuccess){
      toast.success('Blog Updated Successfully');
       dispatch(resetBlog());
      dispatch(resetUpload());

    }else if(deletedBlog && isSuccess){
       dispatch(resetBlog());
      toast.success('Blog Deleted Successfully');
    }else if(isError){
      dispatch(resetUpload());
      dispatch(resetBlog());
      toast.error("Something Went Wrong");
    }

      dispatch(getBlogs());

  },[ addedBlog, updatedBlog, deletedBlog])

  useEffect(()=>{
    dispatch(getBlogs());
  },[])
 

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
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
    },
    {
      title: 'Views',
      dataIndex: 'views',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const data = [];

  blogs.map((elem,index)=>{
    data.push({
      key: index + 1,
      title: elem.title,
      desc: elem.description,
      likes: elem.likes.length,
      views: elem.numViews,
      action: <>
      <div className="flex items-center gap-3">
      <Link to={`../blog/${elem._id}`}>
      <img className="h-5" src={editIcon} alt="edit icon"/>
      </Link>
      <button type="button" onClick={()=>{
       setOpen(true);
        setBlogId(elem._id);
      }}>
        <img className="h-6 " src={deleteIcon} alt="delete icon"/>
      </button>
      </div>
      
      </>,
    });
  })
    

  return (
    <div>
         <h3 className="mb-4 text-2xl font-medium">Blog List</h3>
     <div className="mb-5">
       <Table  columns={columns} dataSource={data} />
    </div>
    <CustomModal open={open} performAction={performAction}  hideModal={hideModal} title={"Do you really want to delete Blog?"}/>
      
    </div>
  )
}

export default BlogList
