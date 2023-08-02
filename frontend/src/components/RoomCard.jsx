import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, IconButton, Tooltip } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import CartButton from './CartButton';
import { LinkContainer } from 'react-router-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAddFavoriteMutation, useGetFavoriteQuery } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Grid } from '@mui/material';
import Rating from '@mui/material/Rating';


const AnimatedCard = animated(Card);

const RoomCard = ({ product }) => {
   const imageBaseUrl = 'http://localhost:5000/uploads/';
    useEffect(() => {
    product},
    [product]);

  const { userInfo } = useSelector(state => state.auth);
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
  });

  const hoverProps = useSpring({
    transform: 'scale(1)',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.10)',
    from: { transform: 'scale(0.9)', boxShadow: 'ash' },
  });

  const handleRoomBooking = (id) => {
  }



  const [isHovered, setHovered] = useState(false);
    const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    border: isHovered ? '2px solid #fff' : 'none',
    background: isHovered ? ' #fff' : '#C3C1BC',
  });

  return (
    <div style={{ padding: '10px' }}>
      <AnimatedCard style={{ ...animationProps, ...hoverProps, ...springProps,borderRadius: '10px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      >
        <Card>
          <LinkContainer to={`/services/accommodation/${product._id}`}>
            <CardActionArea>
              <div>
              <CardMedia
                component="img"
                image={
                    imageBaseUrl+
                    product.image}
                alt={product.name}
                style={{width:'100%',height: '15vw',
                objectFit: 'cover'}}
                position="top"
              />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Available Now</span>
                </Typography>

                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="body2" color="text.secondary">
                    <Rating name="half-rating" defaultValue={product.rating} precision={0.5} readOnly />
                  </Typography>
                </div> */}
                
                <Typography variant="body2" color="text.secondary">
                  <b>${product.price}/night</b>
                </Typography>
              </CardContent>
            </CardActionArea>
          </LinkContainer>
          <LinkContainer to={`/services/accommodation/${product._id}`}>
          <CardActions style={{ justifyContent: 'center' }}>
                <Button size="small" color="success" onClick={handleRoomBooking(product._id)}>
                    View Details
                </Button>
            </CardActions>
            </LinkContainer>
        </Card>
      </AnimatedCard>
    </div>
  );
};

export default RoomCard;
