import { string, array } from 'prop-types'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import RoiDetails from '../RoiDetails/component'
import { compose } from 'redux'
import {
  setLeverageRatio,
  setPercentChange,
  setInitialInvestment,
  setRoiState,
  getFliTokenStrategy,
  getLeverageRatio,
  getInitialInvestment,
  getPercentChange,
  getVolDecayStats,
  getHoldingPeriod,
  setHoldingPeriod
} from './reducer'
// prop :: (String | Number) -> Object -> Result String a

const Calculator = ({
  fliIndexLogo = 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
  // eslint-disable-next-line no-unused-vars
  fliTokenOptions = ['ETH', 'BTC'],
  annualizedVolPercent = 0
}) => {
  const setter = (fn) => (event) => {
    const {
      target: { value }
    } = event
    return fn(value)
  }

  const [
    fliTokenStrategy,
    leverageRatio,
    initialInvestment,
    percentChange,
    holdingPeriod
  ] = [
    getFliTokenStrategy,
    getLeverageRatio,
    getInitialInvestment,
    getPercentChange,
    getHoldingPeriod
    // eslint-disable-next-line react-hooks/rules-of-hooks
  ].map((fn) => useSelector((x) => fn(x)))

  const dispatch = useDispatch()
  const onSetInvestment = compose(dispatch, setInitialInvestment)
  const onSetLeverage = compose(dispatch, setLeverageRatio)
  const onSetPercentChange = compose(dispatch, setPercentChange)
  const onSetHoldingPeriod = compose(dispatch, setHoldingPeriod)
  const calculateReturn = (e) => {
    e.preventDefault()
    const payload = {
      fliTokenStrategy,
      initialInvestment: Number(initialInvestment),
      leverageRatio: Number(leverageRatio),
      percentChange: Number(percentChange)
    }
    dispatch(setRoiState(payload))
  }
  return (
    <div
      className="flex flex-wrap max-w-md sm:w-full justify-around items-center bg-bubble bg-opacity-20
       border-5 border-index2
      rounded-3xl m-1"
    >
      {/* <h4>Current price:{findPrice(priceData)}</h4> */}
      <form
        className="flex flex-col items-center w-11/12"
        onSubmit={calculateReturn}
      >
        <h2 className="text-2xl text-center p-4">FLI Token ROI Calculator</h2>
        <div className="bg-purple-200 p-4 border-3 rounded">
          <h4>
            Annualized Volatility: <b>{annualizedVolPercent.toFixed(2)}%</b>
          </h4>
          <p>
            Read more:{' '}
            <Link href="https://medium.com/indexcoop/how-volatility-decay-affects-fli-products-a10f94977da5">
              <a className="text-blue">
                How Volatility Decay Affects FLI Products.
              </a>
            </Link>
          </p>
        </div>

        <label
          className="m-2 p-4"
          name="percentChangeInput"
          htmlFor="percentChangeInput"
        >
          <span className="w-10 m-2">Percent Change in Token</span>
          <input
            className="w-64"
            id="percentChangeInput"
            type="number"
            value={percentChange}
            onChange={setter(onSetPercentChange)}
          />
        </label>
        <label
          className="m-2 p-4"
          name="investmentAmountInput"
          htmlFor="investmentAmountInput"
        >
          <span className="w-10 m-2">Initial Investment ($USD)</span>
          <input
            className="w-64"
            id="investmentAmountInput"
            type="number"
            value={initialInvestment}
            onChange={setter(onSetInvestment)}
          />
        </label>
        <label
          className="m-2 p-4"
          name="leverageRatioInput"
          htmlFor="leverageRatioInput"
        >
          <span className="w-10 m-2">Leverage Ratio (ex. 1.8)</span>
          <input
            className="w-64"
            id="leverageRatioInput"
            type="number"
            min="1"
            max="2.8"
            step="0.1"
            value={leverageRatio}
            onChange={setter(onSetLeverage)}
          />
        </label>
        <label
          className="m-2 p-4"
          name="holdingPeriodInput"
          htmlFor="holdingPeriodInput"
        >
          <span className="w-10 m-2">Holding Period (Days)</span>
          <input
            className="w-64"
            id="holdingPeriodInput"
            type="number"
            min="10"
            max="90"
            step="10"
            value={holdingPeriod}
            onChange={setter(onSetHoldingPeriod)}
          />
        </label>
        <button
          className="p-4 m-2 text-black bg-purple-200
          transition duration-500 ease-in-out
          border-solid rounded w-3/4
          hover:scale-75
          "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

Calculator.propTypes = {
  fliTokenOptions: array,
  fliIndexLogo: string
}

export default Calculator
