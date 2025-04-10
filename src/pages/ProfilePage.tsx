import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Avatar, 
  Container, 
  Button, 
  TextField,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Logout as LogoutIcon } from '@mui/icons-material';

interface UserProfile {
  username: string;
  email: string;
  bio: string;
  profilePicture?: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    bio: '',
  });
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    // TODO: Replace with actual Cognito/user database fetch
    const fetchUserProfile = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfile({
          username: 'JohnDoe',
          email: 'john.doe@example.com',
          bio: 'Software developer passionate about creating amazing user experiences.',
        });
        setEditedBio('Software developer passionate about creating amazing user experiences.');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call to update bio
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(prev => ({ ...prev, bio: editedBio }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // TODO: Replace with actual Cognito logout URL
      const logoutUrl = 'http://localhost:5173/';
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        // TODO: Replace with actual file upload logic
        await new Promise(resolve => setTimeout(resolve, 1000));
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile(prev => ({ ...prev, profilePicture: reader.result as string }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: '#343541',
        }}
      >
        <CircularProgress sx={{ color: '#10a37f' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#343541',
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={profile.profilePicture}
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#5a5a72',
                fontSize: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              {profile.username.charAt(0).toUpperCase()}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-input"
              type="file"
              onChange={handleProfilePictureChange}
            />
            <label htmlFor="profile-picture-input">
              <IconButton
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: '#10a37f',
                  '&:hover': {
                    bgcolor: '#0d8c6d',
                  },
                }}
              >
                <EditIcon />
              </IconButton>
            </label>
          </Box>
          
          <Typography variant="h4" component="h1">
            {profile.username}
          </Typography>
        </Box>

        {/* Profile Details Section */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 600,
            mx: 'auto',
            bgcolor: '#40414f',
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Profile Details
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              value={profile.email}
              disabled
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Bio
              </Typography>
              {!isEditing ? (
                <IconButton onClick={handleEditClick} sx={{ color: '#10a37f' }}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handleSaveClick} sx={{ color: '#10a37f' }}>
                  <SaveIcon />
                </IconButton>
              )}
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {profile.bio}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: '#ef4444',
              '&:hover': {
                bgcolor: '#dc2626',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage; 