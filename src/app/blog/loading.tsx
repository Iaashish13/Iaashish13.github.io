export default function BlogLoading() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="h-10 bg-muted rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded-lg w-3/4 animate-pulse"></div>
      </div>

      {/* Search skeleton */}
      <div className="mb-6">
        <div className="h-12 bg-muted rounded-lg animate-pulse"></div>
      </div>

      {/* Category filter skeleton */}
      <div className="mb-8">
        <div className="h-6 bg-muted rounded-lg w-48 mb-4 animate-pulse"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-muted rounded-lg w-20 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Blog posts skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-background p-6 space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 bg-muted rounded-full w-16 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-12 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-16 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-14 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
