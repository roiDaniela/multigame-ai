import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function PaperSheet(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="display2" gutterBottom
                            style=
                                {{
                                    color : "red",'font-family': 'cursive'
                                }}>
                    {props.val}
                </Typography>
            </Paper>
        </div>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
//
// function Transition(props) {
//     return <Slide direction="up" {...props} />;
// }
//
// class AlertDialogSlide extends React.Component {
//     state = {
//         open: this.props.open,
//     };
//
//     componentWillReceiveProps = (nextProps) => {
//         this.setState({
//             open: nextProps.open,
//         });
//     }
//
//     handleClickOpen = () => {
//         this.setState({ open: true });
//     };
//
//     handleState = () => {
//         this.setState({ open: this.props.open});
//     };
//
//     handleClose = () => {
//         this.setState({ open: false });
//     };
//
//     render() {
//         return (
//             <div>
//                 {/*<Button onClick={this.handleClickOpen}>Slide in alert dialog</Button>*/}
//                 <Dialog
//                     open={this.state.open}
//                     TransitionComponent={Transition}
//                     keepMounted
//                     onClose={this.handleClose}
//                     aria-labelledby="alert-dialog-slide-title"
//                     aria-describedby="alert-dialog-slide-description"
//                 >
//                     <DialogTitle id="alert-dialog-slide-title">
//                         {this.props.val}
//                     </DialogTitle>
//                     {/*<DialogContent>*/}
//                         {/*<DialogContentText id="alert-dialog-slide-description">*/}
//                             {/*this.props.val*/}
//                         {/*</DialogContentText>*/}
//                     {/*</DialogContent>*/}
//                     <DialogActions>
//                         <Button onClick={this.handleClose} color="primary">
//                             Ok
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         );
//     }
// }
//
// export default AlertDialogSlide;
