import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps { 
  length: number;
  isVisible: boolean;
}

export default function UsersOverviewSkeleton ({ length, isVisible }: SkeletonProps) {
  const skeletonLength = Array.from({ length }, (_, index) => index);

  if(!isVisible) return;
  return (
    <tbody>
      {skeletonLength.map((_, i) => 
        (<tr key={'overview-' + i} className='bg-[white] border-b'>
          <td className='p-4 w-1/12'>
            <div className='flex items-center'>
              <input 
                id='checkbox-table-search-1' 
                type='checkbox' 
                className='w-4 h-4 bg-gray-100 border-gray-300 rounded'
              />
            </div>
          </td>
          <td className='p-4'>
            <Skeleton/>
          </td>
          <td className='p-4'>
            <Skeleton/>
          </td>
          <td className='p-4'>
            <Skeleton/>
          </td>
          <td className='p-4'>
            <Skeleton/>
          </td>
          <td className='p-4'>
            <Skeleton/>
          </td>
        </tr>)
      )}
    </tbody>
  )
}