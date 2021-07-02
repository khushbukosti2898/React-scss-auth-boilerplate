/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { checkValidation, setItemInStorage } from '../utils/helper';
import CustomInput from '../components/common/form-controls/CustomInput';
import ReactSelect from '../components/common/form-controls/Select';

const initailValue = {
  email: '',
  password: '',
  role: null,
};

const Login = () => {
  const [formData, setFormData] = useState(initailValue);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const auth = useAuth();

  const onLoginClick = (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    const validationError = checkValidation(errors, {
      email,
      password,
      role,
    });
    if (Object.keys(validationError).length !== 0) {
      setErrors(validationError);
    } else {
      auth.login();
      setItemInStorage('user', {
        email,
      });
      history.push('/');
    }
  };

  const onChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validationHandler = (name, error) => {
    setErrors({
      ...errors,
      [name]: error,
    });
  };
  return (
    <Container>
      <Row className="justify-content-center align-items-center h-100vh">
        <Col sm="12" md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-5">
                Login
              </CardTitle>
              <Form onSubmit={onLoginClick}>
                <CustomInput
                  type="email"
                  name="email"
                  value={formData.email}
                  label="Email"
                  placeholder="Enter email"
                  isRequired
                  reqType="email"
                  onChange={onChange}
                  validationHandler={validationHandler}
                  error={errors.email}
                />
                <CustomInput
                  type="password"
                  name="password"
                  value={formData.password}
                  label="Password"
                  placeholder="Password"
                  onChange={onChange}
                  validationHandler={validationHandler}
                  isRequired
                  error={errors.password}
                />
                <ReactSelect
                  name="role"
                  value={formData.role}
                  label="Role"
                  placeholder="Role"
                  onChange={onChange}
                  validationHandler={validationHandler}
                  options={[
                    { label: 'Super Admin', value: 'superAdmin' },
                    { label: 'Admin', value: 'admin' },
                  ]}
                  isRequired
                  error={errors.role}
                />
                <Button color="primary">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
