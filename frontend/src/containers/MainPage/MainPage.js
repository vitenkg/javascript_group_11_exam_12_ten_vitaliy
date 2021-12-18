import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {fetchGalleryRequest} from "../../store/actions/galleriesActions";
import GalleryItem from "../../components/GalleryItem/GalleryItem";

const useStyles = makeStyles(theme => ({
    title: {
        margin: "0 0 30px 20px",
    },
    root: {
        display: 'flex',
    },
}));

const MainPage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const galleries = useSelector(state => state.galleries.galleries);

    useEffect(() => {
        dispatch(fetchGalleryRequest());
    }, [dispatch]);

    return (
        <Grid container>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h4">All galleries</Typography>
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
                            title={gallery.title}
                            userImage={gallery.user}
                            image={gallery.image}
                            show
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainPage;