import React, { useState } from 'react';
import { TextField, Button, Box, Avatar, Grid, Paper, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { db } from '../../firebase';  // Firebase Firestore setup
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';  // Import useSelector from Redux
import './ProfilePage.scss';

const ProfilePage = () => {
  // Fetch user data from Redux store
  const user = useSelector((state) => state.user.data);

  const [userName, setUserName] = useState(user?.name || 'User');
  const [userEmail] = useState(user?.email || 'No email');
  const [profilePic, setProfilePic] = useState(user?.profilePic || 'https://via.placeholder.com/150');
  const [newUserName, setNewUserName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async () => {
    if (user && newUserName) {
      try {
        const userDocRef = doc(db, 'users', user.uid);  // Access user ID from Redux state
        await updateDoc(userDocRef, {
          name: newUserName || userName,
          profilePic: newProfilePic || profilePic,
        });
        setUserName(newUserName || userName);
        setProfilePic(newProfilePic || profilePic);
        setIsEditing(false); // Stop editing after updating
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <div className="profile-page">
      <Typography variant="h4" gutterBottom align="center">User Profile</Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="profile-paper" elevation={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="User Avatar"
                src={profilePic}
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Button
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(!isEditing)}
                variant="outlined"
                color="primary"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Box>

            <Box padding={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={isEditing ? newUserName : userName}
                onChange={(e) => setNewUserName(e.target.value)}
                disabled={!isEditing}
                margin="normal"
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userEmail}
                disabled
                margin="normal"
              />

              <TextField
                label="Profile Picture URL"
                variant="outlined"
                fullWidth
                value={isEditing ? newProfilePic : profilePic}
                onChange={(e) => setNewProfilePic(e.target.value)}
                disabled={!isEditing}
                margin="normal"
              />

              {isEditing && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateProfile}
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Save Changes
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
