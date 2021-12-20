import { Dialog, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from 'react';
function BulkDialog(props) {
    const { onClose, open, data } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{
            padding: "14px"
        }}>
            <DialogTitle id="simple-dialog-title">Bulk Answer List</DialogTitle>
            <FormControl component="fieldset">
                <RadioGroup aria-label="bulkAnswer" name="bulkAnswer">
                    {data && data.map((dropDownItem) => (
                        <FormControlLabel value={dropDownItem.val} control={<Radio />} label={dropDownItem.val} style={{
                            padding: "5px"
                        }}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </Dialog>
    );
}

export default BulkDialog;