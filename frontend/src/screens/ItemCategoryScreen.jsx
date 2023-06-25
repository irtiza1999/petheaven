import { useGetSubCategoryProductsQuery } from '../slices/productsApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';


const ItemCategoryScreen = () => {
  const { item: cat } = useParams();
  const { data: products, isLoading, error } = useGetSubCategoryProductsQuery(cat);

  return (
    <div>
  <h2 style={{ padding: '10px', textAlign: 'center', paddingTop: '50px' }}>
    {cat.toUpperCase()}
  </h2>
  {isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant={'error'}>{error.data.message}</Message>
  ) : products ? ( 
    <Row style={{ padding: '10px', textAlign: 'center', marginTop: '50px', marginBottom: '80px' }}>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  ) : (
    <Message variant='info'>No products found.</Message>
  )}
</div>

  );
};

export default ItemCategoryScreen;
