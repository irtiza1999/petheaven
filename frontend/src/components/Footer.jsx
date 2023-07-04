import React from 'react';
import './Footer.css'
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from '@mui/material';
import { useGetCategoryQuery } from '../slices/productsApiSlice';
import { FaCcAmex, FaCreditCard, FaPaypal, FaCcVisa } from 'react-icons/fa';


const Footer = () => {
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <h4 className="title">About us</h4>
            <p>
              Embrace Love. Discover pets seeking forever homes. Shop securely, explore heartwarming stories, and join a compassionate community. Experience the joy of pet companionship.
            </p>
          </div>
          <div className="col-sm-4">
            <h4 className="title">Category</h4>
            <div className="category">
              {Array.isArray(categories) &&
                    categories.map((category) => (
                      <LinkContainer key={category} to={`/${category}`}>
                        <Button
                        style={{ color: 'white' }}
                          key={category}
                          sx={{ my: 2, color: 'white' }}
                          // className="categoryB"
                        >
                          {category.toUpperCase()}
                        </Button>
                      </LinkContainer>
                    ))}
            </div>
          </div>
          <div className="col-sm-4">
            <h4 className="title">Payment</h4>
            <ul className="payment">
              <li><span ><FaPaypal /></span></li>
              <li><span ><FaCcAmex /></span></li>
              <li><span ><FaCreditCard /></span></li>
              <li><span ><FaCcVisa /></span></li>
            </ul>
          </div>
        </div>
        <hr />
      <div className="row text-center">
        <span style={{ color: '#fff' }}>
          Copyright © Pet Heaven
          {' '}
          {new Date().getFullYear()}
        </span>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
