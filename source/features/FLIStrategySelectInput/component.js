import { useEffect } from 'react'
import { func, string } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setFliTokenStrategy } from '../Calculator/reducer'
const FliStrategySelectBox = ({ underlyingToken = 'eth', onChange }) => {
  useEffect(() => {
    dispatch(setFliTokenStrategy(underlyingToken))
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [underlyingToken])
  const dispatch = useDispatch()
  console.log({ underlyingToken })
  return (
    <>
      <label>Change Underlying Token</label>
      <select
        defaultValue={underlyingToken}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="eth" selected={underlyingToken === 'eth'}>
          ETH
        </option>
        <option value="btc">BTC</option>
      </select>
    </>
  )
}
FliStrategySelectBox.propTypes = {
  onChange: func,
  underlyingToken: string
}
export default FliStrategySelectBox
