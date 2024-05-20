import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUsersByCountry } from '@/src/services/users';
import UserByCountrySkeleton from './UsersByCountrySkeleton';

interface UsersByCountry {
    _count: number,
    country: string,
    position: number
}

const UsersByCountryTable = () => {
  const columns = ['Top', 'Country', 'Users'];
  const { data, isLoading }: UseQueryResult<UsersByCountry[]> = useQuery({ 
    queryKey: ['ranking_by_country'], 
    queryFn: getUsersByCountry 
  });

  return(
    <div className='card-base px-4 h-min sticky top-4'>
      <h2 className='text-[#344767] font-semibold py-2 mb-4'>
        Ranking
      </h2>

      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            {columns.map((label, i) => (
              <th scope='col' className='p-4' key={label + i}>
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <UserByCountrySkeleton length={5} isVisible={isLoading}/>
        {!isLoading && 
          <tbody>
            {data?.map((row: UsersByCountry) => (
              <tr key={row.country} className='bg-white border-b hover:bg-gray-50'>
                <td className='p-4'>
                  {row.position}
                </td>
                <td className='p-4'>
                  {row.country}
                </td>
                <td className='p-4'>
                  {row._count}
                </td>
              </tr>
            ))}
          </tbody>
        }
      </table>
    </div>
  )
};

export default UsersByCountryTable;