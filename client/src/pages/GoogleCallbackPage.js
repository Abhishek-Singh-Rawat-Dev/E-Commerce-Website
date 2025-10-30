import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Google authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Fetch user data with the token
      const fetchUserData = async () => {
        try {
          const API_BASE_URL = process.env.NODE_ENV === 'production' 
            ? process.env.REACT_APP_API_URL || 'https://your-backend.onrender.com'
            : 'http://localhost:5000';
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            dispatch(setCredentials({ user: data.user, token }));
            toast.success('Successfully signed in with Google!');
            navigate('/');
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
        }
      };

      fetchUserData();
    } else {
      toast.error('Authentication failed. Please try again.');
      navigate('/login');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600">Completing Google sign-in...</p>
      </div>
    </div>
  );
};

export default GoogleCallbackPage;

