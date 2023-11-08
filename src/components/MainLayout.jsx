import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  FormOutlined,
  ShoppingCartOutlined,
  BranchesOutlined,
  SafetyCertificateOutlined,
  CoffeeOutlined,
  OrderedListOutlined,
  BlockOutlined,
  CommentOutlined,
  FlagOutlined,
  AccountBookOutlined ,
  BellOutlined

} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(()=>{
    if(localStorage.getItem('user') !== undefined){
      const user = JSON.parse(localStorage.getItem('user'));
      setUserName(user?.firstname + ' ' + user?.lastname);
      setUserEmail(user?.email);
    }
  },[])

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical flex items-center justify-center gap-4" >
          <span className="sp-logo"><FormOutlined className="text-white text-2xl" /></span>
          <h2 className="t-logo text-white p-1 text-center text-xl font-medium">eMithila</h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={(({ key }) => {
            if (key == "signout") {

            } else {
              navigate(key);
            }
          })}
          items={[
            {
              key: '',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <UserOutlined />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <FormOutlined />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <ShoppingCartOutlined />,
                  label: 'Add Products',
                }, {
                  key: 'product-list',
                  icon: <ShoppingCartOutlined />,
                  label: 'Product List',

                }, {
                  key: 'brand',
                  icon: <BranchesOutlined />,
                  label: 'Brand',

                }, {
                  key: 'brand-list',
                  icon: <BranchesOutlined />,
                  label: 'Brand List',

                }, {
                  key: 'category',
                  icon: <SafetyCertificateOutlined />,
                  label: 'Category',

                }, {
                  key: 'category-list',
                  icon: <SafetyCertificateOutlined />,
                  label: 'Category List',

                }, {
                  key: 'color',
                  icon: <CoffeeOutlined />,
                  label: 'Color',

                }, {
                  key: 'color-list',
                  icon: <CoffeeOutlined />,
                  label: 'Color List',
                },
              ]
            }, {
              key: 'orders',
              icon: <OrderedListOutlined />,
              label: 'Orders',

            }, {
              key: 'blogs',
              icon: <BlockOutlined />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <BlockOutlined />,
                  label: 'Add Blogs',

                },
                {
                  key: 'blog-list',
                  icon: <BlockOutlined />,
                  label: 'Blog List',

                },
                {
                  key: 'blog-category',
                  icon: <BlockOutlined />,
                  label: 'Add Blog Category',

                },
                {
                  key: 'blog-category-list',
                  icon: <BlockOutlined />,
                  label: 'Blog Category List',

                },
              ]
            }, {
              key: 'marketing',
              icon: <  AccountBookOutlined />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <AccountBookOutlined />,
                  label: 'Add Coupon',

                },
                {
                  key: 'coupon-list',
                  icon: <AccountBookOutlined />,
                  label: 'Coupon List',

                },
          ]},{
              key: 'enquiries',
              icon: <CommentOutlined />,
              label: 'Enquiries',

            },



          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between"
          style={{

            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="admin flex items-center gap-5 pr-5">
            <span className="flag"><FlagOutlined className="text-xl" /></span>
            <span className="notification relative"><BellOutlined className="text-xl" /><span className="text-sm font-normal absolute rounded-full bg-orange-400 text-white px-1.5">3</span></span>
            <span className="user-img  w-10 mb-0 overflow-hidden rounded-sm"><img className="w-full" src="https://media.istockphoto.com/id/1406645290/photo/big-financial-data-theft-concept-an-anonymous-hacker-is-hacking-highly-protected-financial.webp?b=1&s=170667a&w=0&k=20&c=BvDOxXaDLWePQZOhOvN9Uf-5EYtMhW15SEhiWSeFMMc=" alt="user" /></span>
            <div className="user-info flex flex-col">
              <span className="user-title font-medium text-md">{userName}</span>
              <span className="user-email text-sm font-normal">{userEmail}</span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >       <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;