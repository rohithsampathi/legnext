import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import Input from './Input';
import Button from './Button';
import { FaBuilding } from 'react-icons/fa'; // Import the community icon

const LoginView = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <Head>
        <title>CommUnity Hub - Login</title>
        <meta
          property="og:title"
          content="CommUnity Hub - An Our Governance Initiative"
        />
        <meta
          property="og:description"
          content="Designed to make LANSUM Eden Gardens a scalable and sustainable community."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-4">
        <div className="text-center">
          <FaBuilding className="text-darkText w-20 h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to CommUnity Hub
          </h2>
          <p className="text-gray-600 mb-6">
            An Our Governance Initiative for LANSUM Eden Gardens
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
