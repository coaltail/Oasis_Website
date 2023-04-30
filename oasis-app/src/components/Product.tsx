import React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useEffect } from "react";

interface Props {
    name: string;
    price: number;
    image: string;
    onClick: () => void;
}

const Product: React.FC<Props> = ({ name, price, image, onClick }: Props) => {
    return (
        <Card
            sx={{
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    border: "1px solid #ccc",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                },
                width: 300,
                height: 400,
                margin: 2,
                cursor: "pointer",
            }}
            onClick={onClick}
            variant="outlined"
        >
            <CardMedia
                component="img"
                sx={{
                    height: "70%",
                    width: "100%",
                    objectFit: "contain",
                    mt: 2,
                }}
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
