import UsersOverviewTable from '../../../components/tables/UsersOverviewTable'

const Users = () => {
  return (
    <main className='flex flex-1 flex-col py-4 pl-2 pr-6 gap-6'>
      <h1 className='text-[#344767] font-semibold'>
        Users
      </h1>
      <UsersOverviewTable/>
    </main>
  )
}

export default Users;