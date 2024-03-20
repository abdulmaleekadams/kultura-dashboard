import Link from 'next/link';

export default function Home() {
  return (
    <Link href={'/dashboard'} className='text-2xl'>
      Visit Dashboard
    </Link>
  );
}
