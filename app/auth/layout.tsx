const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='h-screen flex flex-col justify-center items-center px-8'>
      {children}
    </div>
  );
};

export default AuthLayout;
