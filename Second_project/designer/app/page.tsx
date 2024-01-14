import Code from "@/app/components/Code";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
      <Code placeholder="Type your code here" />
    </main>
  )
}
