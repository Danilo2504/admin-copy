import React, { Dispatch, SetStateAction } from 'react';

interface TimeRangeSelectorProps {
  onChange: Dispatch<SetStateAction<string>>;
  intervals: string[];
  currentInterval: string;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onChange, intervals, currentInterval }) => {
  const styles = {
    default: 'border-none px-4 py-1 rounded-xl',
    normal: 'hover:bg-[transparent] bg-gray-50',
    focus: 'hover:bg-[#2e8fff] bg-[#2e8fff] outline-none text-[white]',
  };
  
  return (
    <div className='text-gray-500 text-[10px] w-60 flex gap-2 justify-end'>
      {intervals.map((interval: string) => {
        const isCurrent = currentInterval === interval.toLowerCase();
        const className = isCurrent ? `${styles.default} ${styles.focus}` : `${styles.default} ${styles.normal}`;
        return (
          <button
            key={interval}
            className={className}
            onClick={() => onChange(interval.toLowerCase())}
          >
            {interval}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeSelector;