import React, { Dispatch, SetStateAction } from 'react'
import { 
  EllipsisVerticalIcon,
  TrashIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import CustomIcon from '../CustomIcon'

interface UserOptionsProps {
  id: string;
  currentUser: string | null;
  setCurrentUser: Dispatch<SetStateAction<string | null>>
}

const UserOptions = ({ id, currentUser, setCurrentUser }: UserOptionsProps) => {
  const toggleDropdown = () => {
    if(currentUser !== id) setCurrentUser(id);
    else setCurrentUser(null);
  };
  
  const deleteUser = () => {
    console.log('delete user here');
    setCurrentUser(null);
  }

  const resetPassword = () => {
    console.log('reset password here');
    setCurrentUser(null);
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:outline-none'
        type='button'
      >
        <EllipsisVerticalIcon className='h-5 w-5' />
      </button>

      {currentUser === id && (
        <div className='absolute z-10 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-40'>
          <ul className='py-2 text-xs text-gray-600'>
            <li>
              <button 
                className='text-left px-4 py-2 w-full hover:bg-gray-100'
                onClick={deleteUser}
              >
                Delete Users
              </button>
            </li>
            <li>
              <button
                className='text-left px-4 py-2 w-full hover:bg-gray-100'
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserOptions;
