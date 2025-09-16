import Counter from "./counter";
import Posts from "./Posts";


export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Redux Toolkit + RTK Query with Next.js 15.5.3
      </h1>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Counter />
        <Posts />
      </div>

      <div className="mt-8 p-6 border rounded-lg bg-blue-50">
        <h2 className="text-2xl font-bold mb-4">What's Working:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Redux Toolkit:</strong> Counter with increment/decrement
            actions
          </li>
          <li>
            <strong>RTK Query:</strong> Fetching posts from JSONPlaceholder API
          </li>
          <li>
            <strong>Caching:</strong> Data is cached and shared across
            components
          </li>
          <li>
            <strong>Mutations:</strong> Create and delete posts (simulated)
          </li>
          <li>
            <strong>TypeScript:</strong> Full type safety throughout
          </li>
          <li>
            <strong>Next.js 15.5.3:</strong> Client-side rendering for
            interactive components
          </li>
        </ul>
      </div>
    </main>
  );
}
