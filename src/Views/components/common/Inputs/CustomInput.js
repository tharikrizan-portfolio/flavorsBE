import React from 'react';

export const CustomInput = (props) => {
  return (
    <div className={`form-group mb-3 ${props.error && 'error'}`}>
      <input {...props} className="form-control bootstrap-tagsinput" />
      <p style={{ color: 'red' }}>{props.error?.message}</p>
    </div>
  );
};
