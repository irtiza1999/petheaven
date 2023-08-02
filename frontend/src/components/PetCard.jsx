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

const PetCard = ({ pet }) => {
   const imageBaseUrl = 'http://localhost:5000/uploads/';
    useEffect(() => {
    pet},
    [pet]);

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
          <LinkContainer to={`/pet/${pet._id}`}>
            <CardActionArea>
              <div>
              <CardMedia
                component="img"
                image={
                    // imageBaseUrl+
                    pet.image}
                alt={pet.name}
                style={{width:'100%',height: '15vw',
                objectFit: 'cover'}}
                position="top"
              />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {pet.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Available Now</span>
                </Typography>
                 <Button style={{marginTop:'10px'}}size="small" color="success">
                    View Details
                </Button>
              </CardContent>
            </CardActionArea>
          </LinkContainer>
        </Card>
      </AnimatedCard>
    </div>
  );
};

export default PetCard;
