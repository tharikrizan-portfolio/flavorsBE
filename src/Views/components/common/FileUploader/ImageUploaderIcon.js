import React from 'react';
import PropTypes from 'prop-types';
import ImageUploader from './ImageUploader';
import IconButton from '@material-ui/core/Button';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const ImageUploaderIcon = ({ setLocalImage }) => {
  return (
    <div className="img-container">
      <div className="img-infoi">
        <ImageUploader onChange_={setLocalImage} type="configuration" />
      </div>
      <div>
        <IconButton style={{ border: 'none', marginLeft: '-11px' }} variant="outlined">
          <AddPhotoAlternateIcon />
        </IconButton>
      </div>
    </div>
  );
};

ImageUploaderIcon.propTypes = { setLocalImage: PropTypes.func };

export default ImageUploaderIcon;
