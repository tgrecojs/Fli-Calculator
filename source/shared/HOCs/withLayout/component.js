import Head from 'next/head'
import Link from 'next/link'

const WithLayout = (ComposedComponent) => {
  // eslint-disable-next-line react/prop-types
  return ({ pageTitle = 'ETH 2x FLI Calculator Web App', ...rest }) => (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="relative min-h-screen md:flex">
        {/* <!-- mobile menu bar --> */}
        <div className="bg-index3 text-gray-500 flex justify-between md:hidden">
          {/* <!-- logo --> */}
          <Link href="/">
            <a className="block p-4 font-bold">FLI Dashboard</a>
          </Link>
          {/* <!-- mobile menu button --> */}
          <button
            onClick={() => {
              const sidebar = document.querySelector('.sidebar')
              sidebar.classList.toggle('-translate-x-full')
            }}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* <!-- sidebar --> */}
        <div className="sidebar bg-purple-800 text-purple-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
          {/* <!-- logo --> */}
          <Link href="/">
            <a className="text-white flex items-center space-x-2 px-4">
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <span className="text-2xl font-extrabold">FLI Dashboard</span>
            </a>
          </Link>
          {/*
    <!-- nav --> */}
          <nav>
            <Link href="/" shallow={true}>
              <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white">
                ETH2x-FLI
              </a>
            </Link>
            {/* <Link href="/chart" shallow={true}>
              <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-700 hover:text-white">
                Chart
              </a>
            </Link> */}
          </nav>
        </div>
        {/* <!-- content --> */}
        <div className="flex flex-col items-center w-full bg-cover 
        bg-gradient-to-l from-index via-index2 to-index3 bg-opacity-90">
          <ComposedComponent {...rest} />
        </div>
      </div>
    </>
  )
}
export default WithLayout
