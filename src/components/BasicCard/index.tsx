import {
  ComponentType,
  PropsWithoutRef, 
  ComponentProps 
} from 'react'

type HeroIconProps = ComponentType<
  PropsWithoutRef<ComponentProps<'svg'>> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;
interface BasicCardProps {
  title: string;
  value: number;
  color: string;
  icon: HeroIconProps;
}

const BasicCard: React.FC<BasicCardProps> = ({ title, value, color, icon: Icon }) => {
  
  return(
    <div className='card-base h-[130px] flex-1 flex justify-between items-between flex-col mt-[1rem]'>
      <div className='flex justify-between'>
        <div 
          style={{ backgroundColor: color }} 
          className='rounded-xl h-16 w-16 flex justify-center items-center text-white relative top-[-2rem] shadow-lg'
        >
          <Icon className='h-6 w-6 text-color-inherit'/>
        </div>
        <div className='text-right'>
          <h1 className='text-sm font-extralight text-[#7B809A]'>
            {title}
          </h1>
          <p className='font-semibold text-[#344767] text-2xl'>
            {value}
          </p>
        </div>
      </div>
      <hr className='border-1 w-full p-2 border-[#efefef] mx-auto'/>
      <div className='mr-auto'>
        <p className='text-xs text-left font-extralight text-[#7B809A]'>
          Just updated
        </p>
      </div>
    </div>
  )
};

export default BasicCard;