import Header from '../components/layout/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>
        DashboardLayout
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
