export function EggheadBanner() {
  return (
    <a
      href="https://egghead.io/courses/mock-rest-and-graphql-apis-with-mock-service-worker-8d471ece"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block p-8 border border-gray-200 bg-gray-50 rounded-xl hover:bg-gray-200 hover:border-gray-300"
    >
      <img
        src="/egghead-course.png"
        alt="Mock REST and GraphQL API with Mock Service Worker"
        className="absolute left-0 right-0 mx-auto sm:mx-0 sm:left-8 -top-5 sm:top-0 h-32 transition-transform group-hover:scale-110"
      />
      <div className="pt-24 sm:pt-0 sm:pl-[156px] text-lg">
        <p className="mb-2 text-xl font-bold">
          I've released an Egghead course! 🎉
        </p>
        <p className="text-gray-600">
          Learn how to mock REST and GraphQL APIs like with Mock Service Worker.
        </p>
      </div>
    </a>
  )
}
