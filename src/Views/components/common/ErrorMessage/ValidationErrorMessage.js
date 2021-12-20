import React from 'react';
import PropTypes from 'prop-types';

function ValidationErrorMessage({ error }) {
  if (!error) return null;
  const { isError, errorMsg } = error;

  return (
    <>
      {isError && (
        <div>
          <p style={{ color: 'red' }}>{errorMsg}</p>
        </div>
      )}
    </>
  );
}

ValidationErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ValidationErrorMessage;
