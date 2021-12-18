import React, {useEffect, useState} from 'react';
import {Avatar, Container, Grid, Link, makeStyles, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clearErrorUser, loginUserRequest, registerUserRequest} from "../../store/actions/usersActions";
import {clearErrorGallery, createImage} from "../../store/actions/galleriesActions";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {Alert} from "@material-ui/lab";
import FormElement from "../../components/Form/FormElement";
import ButtonWithProgress from "../../components/UI/AppToolbar/ButtonWithProgress/ButtonWithProgress";
import FacebookLogin from "../../components/UI/FacebookLogin/FacebookLogin";
import GoogleLogin from "../../components/UI/GoogleLogin/GoogleLogin";
import {Link as RouterLink} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const NewImage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.galleries.createError);
    const loading = useSelector(state => state.galleries.createLoading);
    const [image, setImage] = useState({
        title: '',
        image: null,
    });

    useEffect(() => {
        return () => {
            dispatch(clearErrorGallery());
        };
    }, [dispatch]);


    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(image).forEach(key => {
            formData.append(key, image[key]);
        });

        dispatch(createImage(formData));
    };


    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setImage(prevState => ({...prevState, [name]: value}));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setImage(prevState => {
            return {...prevState, [name]: file};
        });
    };


    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].error;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Container component="section" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Save New Image
                </Typography>
                <Grid
                    component="form"
                    container
                    className={classes.form}
                    onSubmit={submitFormHandler}
                    spacing={2}
                >
                    <FormElement
                        required
                        type="text"
                        autoComlete
                        label="Title"
                        name="title"
                        value={image.title}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <TextField
                            required
                            type="file"
                            name="image"
                            onChange={fileChangeHandler}
                            error={getFieldError('image')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Add
                        </ButtonWithProgress>
                    </Grid>

                </Grid>
            </div>
        </Container>
    );
};

export default NewImage;