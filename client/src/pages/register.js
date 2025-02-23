import { Fragment, useState, useCallback, useEffect } from 'react';
import { register } from '../services/user.service';
import { Form,Card,Input,Button,Select } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authInStart, authInSuccess, authInFailure } from '../redux/user/user.slice';
import EmailIcon from '@mui/icons-material/Email';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { toast } from 'react-toastify';

const Register = () => {
  const [registerForm] = Form.useForm();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const validatePassword = (_, value) => {
    if (!value || registerForm.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Passwords do not match!'));
  };


  const handleSubmit = async (values) => {
    try {
      console.log(values);
      dispatch(authInStart());
      const { data } = await register(values);
      if (data.success === false) {
        dispatch(authInFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(authInSuccess(data));
      toast.success('Registration Successful!');
      navigate('/login');
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
            padding: "1rem 2rem"
          }}  
          className="card card-style"
          title={<h2 style={{ color: "black",textAlign: "center"}}>Register</h2>}
        >
            <Form
              form={registerForm}
              onFinish={handleSubmit}
              layout="vertical"
              autoComplete="off"
              initialValues={{ role: 'user' }}
            >
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
                  placeholder="Username"
                  prefix={
                    <UserOutlined className="site-form-item-icon" />
                  }
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
                  placeholder="Password"
                  prefix={
                    <LockOutlined className="site-form-item-icon" />
                  }
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },{ validator: validatePassword }
                ]}
              >
                <Input.Password
                  id="confirmPassword"
                  placeholder="Confirm password"
                  prefix={
                    <LockOutlined className="site-form-item-icon" />
                  }
                />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Select
                  id="role"
                  options={[
                    // { value: 'admin', label: 'Admin' },
                    { value: 'user', label: 'User' },
                  ]}
                  prefix={
                    <EngineeringIcon className="site-form-item-icon" />
                  }
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: "Valid Email is required"
                  },
                ]}
              >
                <Input
                  id="email"
                  placeholder="Email"
                  prefix={
                    <EmailIcon className="site-form-item-icon" />
                  }
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
                  {loading ? 'loading...' : "Register"}
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign:"center"}}>
              Already Have A Account? <Link to="/login">Login</Link>
          </div>
        </Card>
      </div>
    </Fragment>
);
};
            
export default Register;
