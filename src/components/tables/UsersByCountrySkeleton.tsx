import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonProps { 
  length: number;
  isVisible: boolean;
}

export default function UserByCountrySkeleton ({ length, isVisible }: SkeletonProps) {
  const skeletonLength = Array.from({ length }, (_, index) => index);

  if(!isVisible) return;
  return (
    <tbody>
      {skeletonLength.map((_, i) => 
        (<tr key={'country-' + i} className='bg-white border-b hover:bg-gray-50'>
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