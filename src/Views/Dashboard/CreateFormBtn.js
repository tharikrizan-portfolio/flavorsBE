import React, { Fragment, useState } from 'react';
import FormModal from './formTypeModal';
import Button from '@material-ui/core/Button';
import SimpleDialog from '../components/common/AlertDialog/SimpleDialog';

const CreateFormBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <SimpleDialog
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        title=""
        description=""
        isActionsButtonsVisible={false}
        isCenter={true}
      >
        <FormModal />
      </SimpleDialog>
      <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}>
        Create Form
      </Button>
    </Fragment>
  );
};

export default CreateFormBtn;
