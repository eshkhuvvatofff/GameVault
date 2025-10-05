export default function Home() {
  return (
    <>
      <section className="px-4 py-32 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-8/12 md:text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl md:leading-tight md:font-extrabold">A secure, faster way to transfer.</h1>
          <p className="mb-6 text-lg text-gray-500 md:text-xl md:leading-normal">
            We’re on a mission to bring transparency to finance. We charge as little as possible, and we always show you upfront. No hidden fees. No bad exchange rates. No surprises.
          </p>
          <form className="grid w-full grid-cols-1 gap-3 pt-1 mx-auto mb-8 lg:grid-cols-6 md:w-7/12">
            <label className="col-auto lg:col-span-4">
              <span className="sr-only">Your Email</span>
              <input className="mt-0 form-input form-input-lg" type="email" placeholder="Enter your email..."/>
            </label>
            <button className="w-full col-auto btn btn-primary btn-lg lg:col-span-2" type="submit">Get Started</button>
          </form>
          <div className="flex flex-col justify-start mb-3 space-x-0 space-y-2 text-xs text-gray-600 md:flex-row md:justify-center md:space-x-8 md:space-y-0">
            <div className="flex items-center">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              14 days free
            </div>
            <div className="flex items-center">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </>
  )
}