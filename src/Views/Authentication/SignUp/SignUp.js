import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import { AUTH_SIGN_IN_URL } from '../../../store/constant';
import { userSignUp } from '../../../actions/user.actions';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '../../components/common/Inputs/CustomInput';
import { useSelector } from 'react-redux';

const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required('Password is required'),
  cPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onChange',
  });

  const requestError = useSelector((state) => state?.userData?.error);

  const [formErrors, setFormErrors] = useState();

  useEffect(() => {
    setFormErrors({ ...requestError, ...errors });
  }, [requestError, JSON.stringify(errors)]);

  const onSubmit = (data) => {
    dispatch(userSignUp(data));
  };

  console.log('errors',errors);
  console.log('formErrors',formErrors);

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-user-plus auth-icon" />
                </div>
                <h3 className="mb-4">Sign up</h3>
                <CustomInput
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  error={formErrors?.firstName}
                  placeholder="First Name"
                />
                <CustomInput
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  error={formErrors?.lastName}
                  placeholder="Last Name"
                />
                <CustomInput
                  {...register('email')}
                  type="text"
                  id="email"
                  error={formErrors?.email}
                  placeholder="Email"
                />
                <CustomInput
                  {...register('password')}
                  type="password"
                  id="password"
                  error={formErrors?.password}
                  placeholder="Password"
                />
                <CustomInput
                  {...register('cPassword')}
                  type="password"
                  id="cPassword"
                  error={formErrors?.cPassword}
                  placeholder="Confirm Password"
                />

                <button className="btn btn-primary shadow-2 mb-4" type="submit">
                  Sign up
                </button>
                <p className="mb-0 text-muted">
                  Allready have an account?{' '}
                  <a href={AUTH_SIGN_IN_URL} style={{ paddingLeft: '.4em' }}>
                    Login
                  </a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp;
