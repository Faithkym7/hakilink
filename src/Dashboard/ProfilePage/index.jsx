import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';  // Firebase setup
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Box, Avatar, Grid, Paper, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import './ProfilePage.scss';

const ProfilePage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newProfilePic, setNewProfilePic] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || 'User');
            setUserEmail(userData.email || 'No email');
            setProfilePic(userData.profilePic || 'https://via.placeholder.com/150');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user && newUserName) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
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
