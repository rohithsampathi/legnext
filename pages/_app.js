// pages/_app.js

import { AuthProvider } from '../contexts/AuthContext';
import { SidebarProvider } from '../contexts/SidebarContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  );
}

export default MyApp;
