import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

class AlertDialog extends React.Component {
    state = {
        open: this.props.delete,
    };


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.closeModalDelete();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.delete}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc muốn xóa người dùng này?"}</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description">Bạn có chắc muốn xóa người dùng này?</DialogContentText> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Hủy bỏ</Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>Đồng ý</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
AlertDialog.propTypes = {
    delete: PropTypes.bool,
    closeModalDelete: PropTypes.func,
};
export default AlertDialog;