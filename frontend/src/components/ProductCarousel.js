import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-secondary w-full'
      style={{
        backgroundImage: "url('../images/ee_home.jpg')",
        backgroundSize: 'cover',
        opacity: '0.75',
        marginTop: '-16px',
        marginBottom: '25px',
      }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              style={{
                opacity: '1',
              }}
              src={product.image}
              alt={product.name}
              fluid
              className='shadow'
            />
            <Carousel.Caption className='carousel-caption'>
              <h2
                style={{
                  color: 'white',
                  fontSize: '26px',
                }}
                className='text-uppercase font-weight-bold'
              >
                {product.name}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
