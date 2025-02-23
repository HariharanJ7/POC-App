import React, { useEffect, useState , useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme ,Button} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { logOutUser } from '../redux/user/user.slice';
import { useDispatch,useSelector } from 'react-redux';
import { getToken } from '../services/user.service';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = useCallback(() => {
    dispatch(logOutUser());
    navigate('/login', { replace: true });
  },[dispatch, navigate]);

  const user = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    const api = user.token ? getToken(user.token) : null;
      // console.log(api);
    const fetchData = async () => {
      try {
        const response = await api.get('/userProfile');
        setData(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data?.message);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo">Dashboard </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Home',
            },
            user.currentUser?.role === 'admin' && {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Admin Panel',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Profile',
            },
          ].filter(Boolean)}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {data}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        POC Dashboard ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default Dashboard;
