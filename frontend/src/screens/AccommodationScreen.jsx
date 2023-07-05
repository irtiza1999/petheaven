import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { toast } from 'react-toastify';

const AccommodationScreen = () => {
const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(new Date());
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(new Date());

  const handleCheckInClick = () => {
    setShowCheckInCalendar(true);
  };

  const handleCheckOutClick = () => {
    setShowCheckOutCalendar(true);
  };

  const handleCheckInDateChange = (date) => {
    setSelectedCheckInDate(date);
    setShowCheckInCalendar(false);
    if(selectedCheckInDate > selectedCheckOutDate){
      setSelectedCheckOutDate(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if(date < selectedCheckInDate){
        toast.error("Check-out date cannot be before check-in date");
        setSelectedCheckOutDate(selectedCheckInDate);
        return;
    }
    setSelectedCheckOutDate(date);
    setShowCheckOutCalendar(false);
  };

  const handleCheckOutBlur = () => {
    setTimeout(() => {
      setShowCheckOutCalendar(false);
    }, 10000);
  };

    const handleCheckInBlur = () => {
    setTimeout(() => {
      setShowCheckInCalendar(false);
    }, 10000);
  };

  const handleSearch = () => {
    
    };

  return (
    <>
     <div
style={{
  paddingTop: "250px",
  textAlign: "center",
  backgroundImage: "url('http://localhost:5000/uploads/catDog.jpg')",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}>
    <h1>Welcome to Pet Heaven Accommodations</h1>
    </div>
    <nav style={{ backgroundColor: "#eeeeee", paddingTop: "40px", border: "1px solid #ccfc", borderRadius: '100px', padding: '40px' }}>
        <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>Search For Available Accommodations</h3>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div>
            <label><b>Check-in Date:</b></label>
            <Input
                color="neutral"
                disabled={false}
                placeholder=""
                size="lg"
              type="text"
              value={selectedCheckInDate.toDateString()}
              onClick={handleCheckInClick}
              onBlur={handleCheckInBlur}
              readOnly
            />
            {showCheckInCalendar && (
              <Calendar
                onChange={handleCheckInDateChange}
                value={selectedCheckInDate}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div>
            <label><b>Check-out Date:</b></label>
            <Input
                color="neutral"
                disabled={false}
                placeholder=""
                size="lg"
              type="text"
              value={selectedCheckOutDate.toDateString()}
              onClick={handleCheckOutClick}
              onBlur={handleCheckOutBlur}
              readOnly
            />
            {showCheckOutCalendar && (
              <Calendar
                onChange={handleCheckOutDateChange}
                value={selectedCheckOutDate}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </nav>
    </>
  );
};

export default AccommodationScreen;