import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps, reduxStore }) {
  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default withReduxStore(MyApp)
