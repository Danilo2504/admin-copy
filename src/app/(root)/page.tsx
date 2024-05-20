'use client'
import '../../styles/globals.css';

import BasicCard from '@/src/components/BasicCard';
import UsersByCountry from '@/src/components/tables/UsersByCountry';
import NewUsersChart from '@/src/components/charts/NewUsersChart';

import { 
  UserPlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import { getUsersStats } from '@/src/services/users';

const Home: React.FC<{}> = () => {
  const { data, isLoading } = useQuery({ 
    queryKey: ['main_stats'], 
    queryFn: getUsersStats 
  });
  
  const renderTopItems: any = [{
    title: 'Total Users',
    value: isLoading ? '...' : data.totalUsers,
    color: '#3490f7',
    icon: UserPlusIcon
  }, {
    title: 'Active Users',
    value: isLoading ? '...' : data?.activeUsers,
    color: '#59e29a',
    icon: ChartBarIcon
  }];

  return (
    <main className='grid auto-rows-auto py-4 pl-2 pr-6 gap-6'>
      <h1 className='text-[#344767] font-semibold'>
        Dashboard
      </h1>
      <div className='grid grid-cols-4 gap-6'>
        {renderTopItems.map(
          (props: any) => <BasicCard {...props} key={props.title}/>
        )}
      </div>
      <div className='grid grid-cols-[5fr_2fr] gap-6'>
        <NewUsersChart/>
        <UsersByCountry/>
      </div>
    </main>
  )
}

export default Home;