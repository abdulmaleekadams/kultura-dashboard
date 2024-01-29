'use client';
import CompanyList from '@/app/components/ui/companies/CompanyList';
import CreateComapnyForm from '@/app/components/ui/companies/CreateComapnyForm';
import { Button, Modal } from 'antd';
import { useState } from 'react';

const CompaniesPage = () => {
  const [openCreateCompanyForm, setOpenCreateCompanyForm] = useState(false);

  const handleOpenCreateCompanyForm = () => setOpenCreateCompanyForm(true);
  return (
    <>
      <div className='flex justify-between mb-5'>
        <h1 className='text-xl font-bold'>Companies</h1>
        <Button
          className='!bg-blue-600 !text-white py-1.5 px-6 rounded-md tracking-wide'
          onClick={handleOpenCreateCompanyForm}
        >
          Create
        </Button>
      </div>
      <CompanyList>
        <CreateComapnyForm
          openCreateCompanyForm={openCreateCompanyForm}
          setOpenCreateCompanyForm={setOpenCreateCompanyForm}
        />
      </CompanyList>
    </>
  );
};

export default CompaniesPage;
