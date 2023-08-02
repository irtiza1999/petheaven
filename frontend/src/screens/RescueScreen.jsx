import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetAllPetQuery } from '../slices/petApiSlice';
import PetCard from '../components/PetCard';


const RescueScreen = () => {
    const {data, refetch, isLoading, error} = useGetAllPetQuery();
    // if(data){
    //   useEffect(() => {
    //     refetch();
    // }, [data]);
    // }
  return (
    <>
     <div
        style={{
        paddingTop: "250px",
        marginTop: "100px",
        textAlign: "center",
        backgroundImage: "url('https://warringtonanimalwelfare.org.uk/sites/default/files/Dog%20rescue%20society_0.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}>
    </div>
    <h1  style={{textAlign: "center", padding: "10px",}}>Welcome to Pet Heaven Adoption</h1>
    <nav style={{ backgroundColor: "#eeeeee", paddingTop: "40px", border: "1px solid #ccfc", borderRadius: '100px', padding: '40px' }}>
    <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>Find a Loving Home: Post Here to Rescue a Pet in Need!</h3>
      <Grid container justify="center" spacing={2}>
        <Grid item>
        <LinkContainer to='/pet/rescue/add'>
          <Button variant="contained" color="primary">
            Post a Pet for Adoption
          </Button>
          </LinkContainer>
        </Grid>
      </Grid>
    </nav>
    <div style={{ paddingTop: "40px", textAlign: "center" }}>
        <h3>Find a Pet to Adopt</h3>
        <p>Click on a pet to view more details</p>
        {isLoading && <Loader/>}
        {error && <Message severity="error">{error}</Message>}
        {data && data.length === 0 && <Message severity="info">No pets found</Message>}
        {data && data.length > 0 && (
            <Grid container spacing={2}>
                {data.map((pet) => (
                    <Grid item key={pet._id} xs={12} sm={6} md={4} lg={3}>
                        <PetCard pet={pet} />
                    </Grid>
                ))}
            </Grid>
        )}
    </div>
    </>
  );
}

export default RescueScreen
