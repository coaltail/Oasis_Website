import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    name: string;
    price: number;
    image: string;
    onClick: () => void;
}

const Product: React.FC<Props> = ({ name, price, image, onClick }) => {
        
    return (
        <Card sx={{
            maxWidth: 500,
            margin: 2,
            cursor: "pointer",
        }} onClick={onClick}>
            <CardActionArea>
                <CardMedia sx={{ height: 300, width: 400}} image={image} title={name} />
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