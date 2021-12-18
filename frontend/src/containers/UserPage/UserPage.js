import React, {useEffect} from 'react';
import {fetchUserGalleryRequest} from "../../store/actions/galleriesActions";
import {useDispatch, useSelector} from "react-redux";
import {Button, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import GalleryItem from "../../components/GalleryItem/GalleryItem";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    title: {
        margin: "0 0 30px 20px",
    },
    root: {
        display: 'flex',
    },
}));

const UserPage = ({match}) => {
    const id = match.params.id;
    const dispatch = useDispatch();
    const galleries = useSelector(state => state.galleries.galleries);
    const fetchLoading = useSelector(state => state.galleries.fetchLoading);
    const user = useSelector(state => state.users.user);
    const classes = useStyles();


    useEffect(() => {
        dispatch(fetchUserGalleryRequest(id));
    }, [dispatch, id]);

    return (
        <Grid container>
            <Grid item container justifyContent="space-between">
                <Grid item className={classes.title}>
                    <Typography variant="h4">{galleries ? galleries[0].user.displayName : null}</Typography>
                </Grid>
                {user && (
                    <Grid item>
                        <Button color="primary" component={Link} to="/user/new">Add</Button>
                    </Grid>
                )}
            </Grid>
            <Grid item>
                <Grid
                    item
                    container
                    justifyContent="space-between"
                    direction="row"
                    spacing={1}
                    className={classes.root}
                >
                    {galleries && galleries.map(gallery => (
                        <GalleryItem
                            key={gallery._id}
                            id={gallery._id}
                            title={gallery.title}
                            userImage={gallery.user}
                            user={user}
                            paramsId={id}
                            image={gallery.image}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserPage;