import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { db, collection, getDocs, addDoc, Timestamp } from '../../firebase'; // Import Firebase functions

const BillingPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    amount: '',
  });
  const [billingData, setBillingData] = useState([]);
  const [error, setError] = useState('');

  // Fetch billing data from Firestore
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'billing'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID
          ...doc.data(),
        }));
        setBillingData(data);
      } catch (err) {
        console.error("Error fetching billing data: ", err);
        setError('Failed to load billing data.');
      }
    };

    fetchBillingData();
  }, []);

  // Open payment dialog with pre-filled form
  const handleOpenDialog = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      amount: '',
    });
    setOpenDialog(true);
  };

  // Close the payment dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment submission
  const handleSubmitPayment = async () => {
    setLoading(true);
    setError('');
  
    const stkPushUrl = process.env.REACT_APP_STK_PUSH_URL;  // Ensure this is correctly set in .env file
    const apiKey = process.env.REACT_APP_INTA_SEND_API_KEY; // Ensure this is correctly set in .env file
    
    console.log("STK Push URL:", stkPushUrl);
    console.log("api key:", apiKey);

    const { first_name, last_name, email, amount } = formData;
    let phone_number = formData.phone_number;  // Use let since we will modify the phone number
  
    // Format the phone number correctly
    if (phone_number.startsWith('+')) {
      phone_number = phone_number.slice(1);  // Remove the '+' sign
    }
    if (phone_number.startsWith('07')) {
      phone_number = '254' + phone_number.slice(1);  // Replace '07xx' with '2547xx'
    }
  
    try {
      // Make the request to the STK Push API
      const response = await fetch(stkPushUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({          
          amount: amount,
          phone_number: phone_number,
          api_ref: `order_${Date.now()}`, // Generate unique api_ref
          wallet_id: null,  // Optional: If needed, use actual wallet_id here
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to trigger STK push: ${response.statusText} - ${errorText}`);
      }
  
      const respData = await response.json();
      console.log(`STK Push Response:`, respData);
  
      // Save payment data to Firestore
      const paymentData = {
        first_name,
        last_name,
        email,
        amount,
        phone_number,
        date: Timestamp.fromDate(new Date()), // Store timestamp of payment
        payment_status: 'success', // Mark payment status as successful
        payment_url: respData.id, // Store the payment URL for redirect
      };
  
      // Add the payment data to Firestore
      await addDoc(collection(db, 'billing'), paymentData);
      console.log('Payment data added to Firestore!');
  
      // Redirect to MPESA payment page
      if (respData.payment_url) {
        window.location.href = respData.payment_url; // Redirect to the payment page
      } else {
        setError('Failed to retrieve payment URL.');
      }
  
      setOpenDialog(false); // Close the dialog upon success
    } catch (err) {
      console.error('Error:', err);
      setError('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  // DataGrid columns for displaying billing records
  const columns = [
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueGetter: (params) => {
        const date = params.row?.date;  // Safe access to date
        if (date && date.toDate) {  // Check if date exists and is a Firestore Timestamp
          return date.toDate().toLocaleString();  // Safely format the date
        } else {
          return 'N/A';  // Provide fallback value when date is missing or invalid
        }
      },
    },
    { field: 'amount', headerName: 'Amount (KES)', width: 150 },
  ];
  
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lawyer Monthly Billing
      </Typography>

      {/* Add Payment Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={handleOpenDialog}
      >
        Make Payment
      </Button>

      {/* DataGrid displaying billing records */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={billingData} columns={columns} pageSize={5} />
      </div>

      {/* Payment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount (KES)"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitPayment} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Pay Now'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillingPage;
