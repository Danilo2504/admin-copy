import '../styles/globals.css';

import AuthProvider from '../providers/AuthProvider';
import TanStackProvider from '../providers/TankStackProvider';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const font = Poppins({
  weight: ['400', '600'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Maui Admin',
  description: 'This is the admin website from Maui :)',
};

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body className={font.className}>
        <AuthProvider>
          <TanStackProvider>            
            {children}
          </TanStackProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;
