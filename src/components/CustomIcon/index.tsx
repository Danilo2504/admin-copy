import React from 'react';

const CustomIcon = ({ icon: Icon, className }: any) => {
  return <Icon className={`h-5 w-5 text-color-inherit ${className}`} />;
};

export default CustomIcon;
