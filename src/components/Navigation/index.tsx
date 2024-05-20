'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Squares2X2Icon,
  RectangleStackIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import CustomIcon from '../CustomIcon'
import { logo } from '@/src/utils/mock.example'
import './navigation.css'
import { signOut } from 'next-auth/react'

const Navigation = () => {
  const pathname = usePathname();
  return(
    <aside className='h-screen sticky top-0 p-0 pr-4'>
      <nav className='flex flex-col header h-full'>
        <div className='p-4 pb-2 flex items-center'>
          <img
            src={logo}
            alt='Maui-brand'
            width={85}
          />
        </div>
        <hr className='m-5 mx-0'/>

        <ul className='flex flex-1 flex-col gap-1.5'>
          <Link href='/'>
            <li className={`label ${pathname === '/' && 'active'}`}>
              <CustomIcon icon={Squares2X2Icon}/>
              Home
            </li>
          </Link>
          <Link href='/users'>
            <li className={`label ${pathname.startsWith('/users') && 'active'}`}>
              <CustomIcon icon={RectangleStackIcon}/>
              Users
            </li>
          </Link>

          <button onClick={() => signOut()}>
            <li className={`label`}>
              <CustomIcon icon={ArrowRightOnRectangleIcon}/>
              Log Out
            </li>
          </button>
        </ul>
      </nav>
    </aside>
  )
};

export default Navigation;