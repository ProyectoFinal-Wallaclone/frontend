import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Chip, Link } from '@material-ui/core';
import statusEnum from '../utils/advertsEnum';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    tag: {
        marginBottom: 5
    },
    cardContent: {
        position: "relative"
    },
    status: {
        position: "absolute",
        top: 10,
        right: 5,
        fontSize: 12
    },
    link: {
        textDecoration: 'none',
        color: 'black',
        '&:hover': {
            textDecoration: 'none'
        },
    }
});

export default function AdvertCard({ price, name, photo, status, description, tags, id }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Link href={`/adverts/${id}`} passHref className={classes.link}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={photo ? `${process.env.REACT_APP_API_BASE_URL_DEPLOYED}/images/${photo}` : '/img/image-not-available.png'}
                        title="Product image"
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {price}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h3">
                            {name}
                        </Typography>
                        <Typography color="textSecondary" className={classes.status}>
                            {statusEnum[status]}
                        </Typography>
                        {tags.map(tag => {
                            return <Chip variant="outlined" color="primary" size="small" label={tag} key={tag} className={classes.tag} />
                        })}
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card >
    );
}