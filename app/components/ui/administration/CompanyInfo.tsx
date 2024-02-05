const CompanyInfo = () => {
  return (
    <div className='max-w-full shadow-lg w-[31%] bg-white rounded-lg h-[max-content]'>
      <div className='py-4 px-2 bg-gray-100/50'>
        <p className='font-semibold'>Company Info</p>
      </div>
      <div className='[&>:not(:last-child)]:border-b'>
        <div className='py-2 px-4'>
          <div>
            <p className='text-gray-400 text-[0.7rem]'>Address</p>
          </div>
          <p className='text-[0.79rem] ml-3'>
            2158 Mount Tabor, Westbury, New York, USA 11590
          </p>
        </div>
        <div className='py-2 px-4'>
          <div>
            <p className='text-gray-400 text-[0.7rem]'>Phone</p>
          </div>
          <p className='text-[0.79rem] ml-3'>+123 456 789 01 23</p>
        </div>
        <div className='py-2 px-4'>
          <div>
            <p className='text-gray-400 text-[0.7rem]'>Email</p>
          </div>
          <p className='text-[0.79rem] ml-3'>info@globexcorp.com</p>
        </div>
        <div className='py-2 px-4'>
          <div>
            <p className='text-gray-400 text-[0.7rem]'>Website</p>
          </div>
          <p className='text-[0.79rem] ml-3'>https://globexcorp.com</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
