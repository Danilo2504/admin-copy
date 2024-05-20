'use client'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CustomIcon from '../CustomIcon';
import UserOptions from '@/src/components/dropdowns/UserOptions';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/src/services/users';
import UsersOverviewSkeleton from './UsersOverviewTableSkeleton';

const UsersOverviewTable = () => {
  const columns = ['Full Name', 'Email', 'Country', 'Phone', 'Tools'];
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoading, isFetching } = useQuery({ 
    queryKey: ['all_users', searchQuery], 
    queryFn: () => getAllUsers(searchQuery), 
  });

  const users = data?.map((value: any) => {
    const { UserAccount, ...flattenedObject } = value;
    return Object.assign({}, flattenedObject, UserAccount);
  });


  
  return(
    <div className='card-base w-full flex-1'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-[#344767] font-semibold py-2'>
          See All Users
        </h2>

        <div className='relative text-gray-400 w-60'>
          <input
            type='text'
            name='search'
            className='py-2 text-sm w-full shadow-sm text-gray-600 bg-gray-50 rounded-md pr-10 pl-3 focus:outline-none'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
          />
          <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <CustomIcon icon={MagnifyingGlassIcon}/>
            {/* <button type='button' className='p-1 focus:outline-none focus:shadow-outline'>
            </button> */}
          </span>
        </div>
      </div>

      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='p-4'>
              <input
                id='checkbox-all-search'
                type='checkbox'
                className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
              />
            </th>
            {columns.map((label, i) => (
              <th scope='col' className='p-4' key={label + i}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        
        <UsersOverviewSkeleton length={10} isVisible={isLoading || isFetching}/>
        {!(isLoading || isFetching) &&
          <tbody>
            {users?.map((user: any) => (
              <tr key={user.id} className='bg-[white] border-b'>
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input 
                      id='checkbox-table-search-1' 
                      type='checkbox' 
                      className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
                    />
                  </div>
                </td>
                <td className='p-4 font-medium text-gray-900 whitespace-nowrap hover:text-[#3175DC]'>
                  <Link href={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td className='p-4'>
                  {user.email}
                </td>
                <td className='p-4'>
                  {user.country}
                </td>
                <td className='p-4'>
                  {user.cellPhone}
                </td>
                <td className='p-4'>
                  <UserOptions 
                    id={user.id}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>

  )
};

export default UsersOverviewTable;