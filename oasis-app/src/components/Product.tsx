import React from "react";
import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

interface Props {
    name: string;
    price: number;
    image: string;
    onClick: () => void;
}
const useStyles = makeStyles({
    root: {
        minWidth: 200,
        maxwidth: 280
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const Product: React.FC<Props> = ({ name, price, image, onClick }: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}
            sx={{
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    border: "1px solid #ccc",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                },
                cursor: "pointer",
                margin: "0 auto",
                padding: "0.1em",
            }}
            onClick={onClick}
            variant="outlined"
        >
            <CardMedia
                component="img"
                height="250"
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                image={image}
                title={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="h5" color="textPrimary" component="p">
                    ${price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Product;
