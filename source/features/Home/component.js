import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchData } from '../RoiDetails/reducer'

import RoiDetails from '../RoiDetails/component'
import { setFliTokenStrategy } from '../Calculator/reducer'
import { compose } from 'redux'
import FliStrategySelectBox from '../FLIStrategySelectInput/component'
const unbox = (x) => {
  const [data] = x
  return data
}

const trace = (label) => (val) => {
  console.log(`${label}::`, val)
  return val
}
const Volatility = ({ props }) => {
  console.log('inside Home component:::::', props)
  const dispatch = useDispatch()
  const onSetFliSelection = compose(dispatch, setFliTokenStrategy)
  const underlyingToken = useSelector((s) => s.calculatorState.fliTokenStrategy)

  const onSetUnderlyingToken = (value = {}) => {
    onSetFliSelection(value)
    return underlyingToken
  }
  useEffect(() => {
    fetchData(underlyingToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <FliStrategySelectBox
        onChange={onSetUnderlyingToken}
        underlyingToken={underlyingToken}
      />
      <RoiDetails />
    </>
  )
}
export default Volatility
