
import Navbar from '@/components/Dashboard/Navbar';
import { ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
              <Navbar/>

        {children}
      </div>
    );
  }
  