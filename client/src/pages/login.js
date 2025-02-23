import { Fragment, useEffect, useState,useCallback } from 'react';
import { login } from '../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form,Card,Input,Button,Radio } from 'antd';
import EmailIcon from '@mui/icons-material/Email';
import { LockOutlined, UserOutlined,IdcardFilled } from "@ant-design/icons";
import { authInStart, authInSuccess, authInFailure } from '../redux/user/user.slice';
import { toast } from 'react-toastify';

const Login = () => {
  
  const [loginForm] = Form.useForm();
  const [ role, setRole] = useState('user');
  const [ userData, setUserData] = useState({role:'user'});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [id]: role === 'admin' && id === 'email' ? undefined : value,
    }));
  }, [role]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRoleChange = useCallback((e) => {
    const newRole = e.target.value;
    setRole(newRole);
    // setUserData({
    //   ...userData,
    //   role: e.target.value,
    // });
    loginForm.resetFields();

    setUserData({
      role: newRole,
      name: '',
      password: '',
      email: newRole === 'user' ? '' : undefined, // Remove email for admin
    });
  }, [loginForm]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      dispatch(authInStart());
      console.log(userData);
      const { data } = await login(userData);
      if(data.success === false) {
        dispatch(authInFailure(data.token));
        toast.error(data.message);
        return;
      }
      dispatch(authInSuccess(data));
      toast.success('Login Successful!');
      navigate('/dashboard');
      
    } catch (error) {
      dispatch(authInFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <Card
          style={{
            width: "320px",
            borderRadius: "0.75rem",
            backgroundColor: "#f2f2f2",
            padding: "1rem"
          }}  
          className="card card-style"
          title={<h2 style={{ color: "black",textAlign: "center"}}>Login</h2>}
          extra={<Radio.Group id="role" defaultValue="user" optionType="button" buttonStyle="solid" onChange={handleRoleChange}>
          <Radio.Button value="user"><UserOutlined className="me-1" />User</Radio.Button>
          <Radio.Button value="admin"><IdcardFilled className="me-1" />Admin</Radio.Button>
        </Radio.Group>}
        >
          <Form
            form={loginForm}
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
          >
            {role === 'user' && 
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: "Valid Email is required" ,
                  },
                ]}
              >
                <Input
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                  prefix={
                    <EmailIcon className="site-form-item-icon" />
                  }
                />
              </Form.Item>
            }
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input
                id="name"
                prefix={
                  <UserOutlined className="site-form-item-icon" />
                }
                placeholder="Username"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input.Password
                id="password"
                prefix={
                  <LockOutlined className="site-form-item-icon" />
                }
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                loading={loading}
                block
                htmlType="submit"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  textAlign: "center",
                  lineHeight: "1rem",
                }}
              >
                {loading ? 'loading...' : "Login"}
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign:"center"}}>
              No Account? <Link to="/register">Register</Link>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

export default Login;
