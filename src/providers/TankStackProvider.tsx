'use client'
import { queryClient, QueryClientProvider } from '../config/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface TanStackProviderProps {
  children: React.ReactNode;
}

const TanStackProvider: React.FC<TanStackProviderProps> = ({ children }) => {
  return(
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default TanStackProvider;