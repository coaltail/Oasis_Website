import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";

interface Props {
    name: string;
    price: number;
    image: string;
    onClick: () => void;
}

const Product: React.FC<Props> = ({ name, price, image, onClick }) => {
    return (
        <Card sx={{
            maxWidth: 800,
            maxHeight: 800, // adjust maxWidth to fit larger images
            margin: 2,
            cursor: "pointer",
            objectFit: 'cover'
        }} onClick={onClick}>
            <CardActionArea>
                <CardMedia sx={{ width: '100%', height: '100%', objectFit: 'contain' }} image={image} title={name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {price} USD
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Product;
