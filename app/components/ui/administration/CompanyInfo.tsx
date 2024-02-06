import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from 'react-icons/io5';
import { TfiWorld } from 'react-icons/tfi';

const CompanyInfo = () => {
  return (
    <div className='min-w-[500px] blg:min-w-96 max-w-full  shadow-lg  bg-white rounded-lg h-[max-content]'>
      <div className='py-4 px-2 bg-gray-100/50'>
        <p className='font-semibold'>Company Info</p>
      </div>
      <div className='[&>:not(:last-child)]:border-b'>
        <div className='py-2 px-4'>
          <div className='flex text-gray-400 text-sm gap-x-2 items-center'>
            <IoLocationOutline />
            <p className='text-gray-400 text-[0.7rem]'>Address</p>
          </div>
          <p className='text-[0.79rem] ml-6'>
            2158 Mount Tabor, Westbury, New York, USA 11590
          </p>
        </div>
        <div className='py-2 px-4'>
          <div className='flex text-gray-400 text-sm gap-x-2 items-center'>
            <IoCallOutline />
            <p className='text-gray-400 text-[0.7rem]'>Phone</p>
          </div>
          <p className='text-[0.79rem] ml-6'>+234 815 896 4385</p>
        </div>
        <div className='py-2 px-4'>
          <div className='flex text-gray-400 text-sm gap-x-2 items-center'>
            <IoMailOutline />
            <p className='text-gray-400 text-[0.7rem]'>Email</p>
          </div>
          <p className='text-[0.79rem] ml-6'>info@globexcorp.com</p>
        </div>
        <div className='py-2 px-4'>
          <div className='flex text-gray-400 text-sm gap-x-2 items-center'>
            <TfiWorld />
            <p className='text-gray-400 text-[0.7rem]'>Website</p>
          </div>
          <p className='text-[0.79rem] ml-6'>https://globexcorp.com</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
