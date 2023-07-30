import { useGetRoomByDateQuery } from '../slices/roomApiSlice';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import RoomCard from '../components/RoomCard';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';

const FilterAccommodationScreen = () => {
  const { in: checkIn } = useParams();
  const { out } = useParams();
  const { data: products, isLoading, error } = useGetRoomByDateQuery(checkIn, out);

  return (
    <div>
      <h2 style={{ padding: '10px', textAlign: 'center', paddingTop: '50px' }}>
        Available Accommodations from {checkIn} to {out}
      </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
        <Message variant='error'><h6>No accommodations found for <b>{checkIn} to {out}</b></h6></Message>
        </>
      ) : products && products.length > 0 && (
        <Row style={{ padding: '10px', textAlign: 'center', marginTop: '50px', marginBottom: '80px' }}>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <RoomCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FilterAccommodationScreen;
