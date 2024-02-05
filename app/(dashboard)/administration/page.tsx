import CompanyInfo from '@/app/components/ui/administration/CompanyInfo';
import UserList from '@/app/components/ui/administration/UserList';
import Image from 'next/image';
import React from 'react';

const AdministrationPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex items-center gap-x-4 border-b pb-8'>
        <Image
          className='bg-green-200 rounded-full'
          height={80}
          width={80}
          alt='Brand Logo'
          src={''}
        />
        <h1 className='font-bold text-2xl'>Kulture Heiish</h1>
      </div>
      <div className='flex justify-between mt-4'>
        <div className='bg-white rounded-lg w-[67%]'>
          <div className='flex justify-between items-center py-4 px-4'>
            <div className='font-bold'>Users</div>
            <p>
              Total users: <span className='font-semibold'>200</span>
            </p>
          </div>
          <UserList />
        </div>
       <CompanyInfo />
      </div>
    </div>
  );
};

export default AdministrationPage;
