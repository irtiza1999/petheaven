import { useEffect, useState } from 'react';
import { useGetAllProductQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ProductCard from './ProductCard';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import {useNavigate}  from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSpring, animated } from "react-spring";
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import SupportIcon from '@mui/icons-material/Support';

const AllProducts = () => {
  const { data, isLoading, refetch, error } = useGetAllProductQuery();
  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const filter = event.target.value;
    navigate(`/filter/${filter}`);
  };

  const [isHovered, setHovered] = useState(false);
  const [isHovered2, setHovered2] = useState(false);
  const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    border: isHovered ? '2px solid #fff' : 'none',
    background: isHovered ? '##EDBD08' : '#C3C1BC',
  });

    const springProps2 = useSpring({
    scale: isHovered2 ? 1.1 : 1,
    border: isHovered2 ? '2px solid #fff' : 'none',
    background: isHovered2 ? '#F05022' : '#C3C1BC',
  });

  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
          <h5 style={{ marginBottom: '10px' }}>LATEST PRODUCTS</h5>
      </Col>
       <Grid container sx={{ maxWidth: 50 }} justifyContent="flex-start">
        <Row style={{ alignItems: 'center' }}>
          <Col>
            <FormControl style={{ minWidth: '150px' }}>
              <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Filter"
                onChange={handleChange}
                variant="outlined"
                style={{ width: '100%' }}
              >
                <MenuItem value={'stock'}>In Stock</MenuItem>
                <MenuItem value={'pLow'}>Price Low to High</MenuItem>
                <MenuItem value={'pHigh'}>Price High to Low</MenuItem>
                <MenuItem value={'alphaA'}>Name (A-Z)</MenuItem>
                <MenuItem value={'alphaZ'}>Name (Z-A)</MenuItem>
                <MenuItem value={'ratingHigh'}>Rating (Highest)</MenuItem>
                <MenuItem value={'ratingLow'}>Rating (Lowest)</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
      </Grid>
  {isLoading ? (
    <Loader />
  ) : error ? (
    <h3>{<Loader />}</h3>
  ) : (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        style={{ padding: '10px', textAlign: 'center', marginBottom: '80px' }}
      >
        {Array.isArray(data) &&
          data.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </>
  )}

  <Grid
        container
        spacing={3}
        justifyContent="flex-start"
        style={{ padding: '10px', textAlign: '' }}
  >
    <Col style={{ textAlign: '' }}>
      <h5 style={{ marginBottom: '10px', textAlign: 'center' }}>Our Services</h5>
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: '10px'}}>
      <animated.div
      className="card"
      style={{
        padding: '10px',
        // textAlign: 'center',
        marginBottom: '0px',
        ...springProps,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to="/services/accommodation" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ textAlign: 'center' }}>
          <h5>
            <PetsIcon /> Pet Heaven Accommodations <PetsIcon />
          </h5>
        </div>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Book accommodations for your pets effortlessly with Pet Heaven accommodation system.</li>
          <li>Choose dates, select rooms, and view prices with ease. Specify your pets' needs and preferences.</li>
          <li>Make secure online payments to confirm your booking.</li>
          <li>Experience a hassle-free and comfortable stay for your beloved companions.</li>
        </ul>
      </Link>
    </animated.div>
  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginBottom: '10px'}}>
      <animated.div
      className="card"
      style={{
        padding: '10px',
        // textAlign: 'center',
        marginBottom: '0px',
        ...springProps2,
      }}
      onMouseEnter={() => setHovered2(true)}
      onMouseLeave={() => setHovered2(false)}
    >
      <Link to="/services/rescue" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ textAlign: 'center' }}>
          <h5>
            <SupportIcon /> Find Your Perfect Companion <SupportIcon />
          </h5>
        </div>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Partner with local pet adoption or rescue organizations, showcasing available pets on our website to expand adoption opportunities.</li>
          <li>Display of comprehensive pet profiles with age, breed, temperament, and background details, aiding informed decision-making.</li>
          <li>Streamline the adoption process through our website, enabling easy inquiries, meet-up scheduling, and facilitating the adoption journey.</li>
          <li>Promote responsible adoption, fostering lasting connections between pets and loving families for a brighter future.</li>
        </ul>
      </Link>
    </animated.div>
  </Grid>
  </Col>
  </Grid>
</div>

  );
};

export default AllProducts;
