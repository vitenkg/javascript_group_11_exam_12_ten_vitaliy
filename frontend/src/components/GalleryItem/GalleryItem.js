import React from 'react';
import {Button, Grid, makeStyles, Modal, Paper, Typography} from "@material-ui/core";
import {apiURL} from "../../config";
import theme from "../../theme";
import {useDispatch} from "react-redux";
import {eraseUserImageRequest} from "../../store/actions/galleriesActions";
import {Link} from "react-router-dom";

const rand = () => Math.round(Math.random() * 20) - 10;

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const useStyles = makeStyles({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


const GalleryItem = ({title, image, userImage, user, show, id, paramsId}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);

    const classes = useStyles();
    const imageGallery = apiURL + '/uploads/' + image;


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper} align="center">
            <img src={imageGallery} alt="gallery" width='800'/>
            <Typography>{title}</Typography>
            <Button type="button" onClick={handleClose}>Close</Button>
        </div>
    );

    return (
        <Grid item>
            <Paper align='center'>
                <img src={imageGallery} width="200" height="150"/>
                <Typography><Button type="button" onClick={handleOpen}>{title}</Button></Typography>
                {show ? (<Typography>
                    <Button
                        type="button"
                        component={Link}
                        to={"/user/" + userImage._id}
                    >
                        {userImage.displayName}
                    </Button>
                </Typography>) : null}
                {user?._id === userImage._id ? (
                    <Typography>
                        <Button
                            type="button"
                            component={Link}
                            to={"/user/" + userImage._id}
                            onClick={() => dispatch(eraseUserImageRequest({id, paramsId}))}
                        >
                            delete
                        </Button>
                    </Typography>) : null}
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </Grid>
    );
};

export default GalleryItem;