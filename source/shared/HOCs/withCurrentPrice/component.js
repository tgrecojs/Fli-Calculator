import { useEffect } from 'react'

const WithCurrentPrice =
  (ComposedComponent) =>
  ({ underlyingToken = 'eth', ...props }) => {
    // eslint-disable-next-line react/prop-types,react-hooks/rules-of-hooks
    useEffect(() => props.onFetchCurrentPrice(underlyingToken), [])
    console.log('calling fetchCurrent')
    return <ComposedComponent {...props} />
  }
export default WithCurrentPrice
