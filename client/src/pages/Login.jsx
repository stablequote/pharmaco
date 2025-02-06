import { useState } from 'react'
import { Container, Paper, Text, TextInput, Box, Center, Button, PasswordInput, Loader } from '@mantine/core'
import React from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_URL
  const navigate = useNavigate();

  // login function
  const handleLogin = async () => {
    const url = `${BASE_URL}/auth/login`
    const credentials = user;

    try {
      setLoading(!loading)
      const res = await axios.post(url, credentials);
      if(res.status === 200) {
        localStorage.setItem("authToken", res.data.token);
        setLoading(!loading)
        navigate("/home"); // Redirect to dashboard after login
        console.log(res.data.token);
      } else if (res.status === 401) {
        showNotification({
          title: "Login error",
          message: "credentials are not correct, please try again",
          color: "red",
        })
      } else {
        console.log("error")
      }
    } catch (error) {
      console.error('Error:', err);
    }

  }

  return (
    <div>
      <Container size="md" py="lg">
        <Center px="lg">
        <Paper shadow='lg' withBorder py="lg" px={30}>
          <Text fz={26} fw={700}>Pharmaco Login</Text>
          <Box>
            <TextInput label="username" placeholder='enter your username' name="username" value={user.username} p={3} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
            <PasswordInput label="password" placeholder='enter your password' name="password" value={user.password} p={3} mb="xs" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          </Box>
          <Button fullWidth onClick={() => handleLogin()}>{ loading && <Loader size="sm" color='white' variant="oval"/>} &nbsp; Login</Button>
        </Paper>

        </Center>
      </Container>
    </div>
  )
}

export default Login