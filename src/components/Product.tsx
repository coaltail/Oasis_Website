
import {
    Grid,
    Card,

    CardContent,
    CardMedia,
    Typography,
    Button
} from "@mui/material";

interface Props {
    name: string;
    price: number;
    image: string;
    onClick: () => void;
    onNavigate: () => void;
}


const Product: React.FC<Props> = ({ name, price, image, onClick, onNavigate }: Props) => {
    const handleAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick();
    }
    return (
        <Card
            sx={{
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                    border: "1px solid #ccc",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                },
                cursor: "pointer",
                margin: "0 auto",
                padding: "0.1em",
                minWidth: 200,
                maxwidth: 280,
            }}
            variant="outlined"
            onClick={onNavigate}
        >
            <CardMedia
                component="img"
                height="250"
                sx={{ objectFit: "contain" }}
                image={image}
                title={name}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="h5" color="textPrimary" component="p">
                            ${price}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained"
                            sx={{
                                backgroundColor: '#3E8C6F',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#2C6F51',
                                },
                            }} onClick={handleAddToCartClick}>Add to Cart</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Product;