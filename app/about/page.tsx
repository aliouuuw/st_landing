import Link from "next/link"

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold" >AboutPage</h1>
        <Link href="/" className="text-blue-500">Home</Link>
    </div>
  )
}

export default AboutPage