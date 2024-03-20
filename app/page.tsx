'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  
  router.push('/dashboard')
  return (
    <Link href={'/dashboard'} className="text-2xl">Visit Dashboard</Link>
  )
  
}
