import Navigation from '@/src/components/Navigation';

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  return (
    <div className='app'>
      <Navigation/>
      {children}
    </div>
  )
}

export default NavLayout;