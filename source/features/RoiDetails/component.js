import { number, string } from 'prop-types'
import Calculator from '../Calculator/component'
import { useSelector } from 'react-redux'
const fixedNum = (x) => x.toFixed(2)
const capitliaze = (str) => ''.concat(str[0].toUpperCase(), str.slice(1))

const RoiDetails = () => {
  const roiResult = useSelector((s) => s.calculatorState.roiResult)
  const tokenData = useSelector((s) => s.calculatorState.tokenData)
  const volDecayStats = useSelector((s) => s.calculatorState.volDecayStats)
  const calculatorState = useSelector((s) => s.calculatorState)

  return (
    <>
      <div className="flex flex-col items-center w-full m-2">
        <h2 className="flex p-2 text-2xl">Current Price Data</h2>
        {Object.entries(tokenData)
          .map((x) => {
            const [val, ...rest] = x
            console.log({ val, rest })
            return { key: val, price: rest[0].usd }
          })
          .map((x, i) => (
            <div key={x.key}>
              <h3 className="p-2 text-xl">
                {capitliaze(x.key)}
                <span className="text-blue">${x.price}</span>
              </h3>
            </div>
          ))}
      </div>
      <div
        className="flex w-full  flex-wrap sm:flex-nowrap items-baseline justify-around
      "
      >
        <Calculator annualizedVolPercent={volDecayStats.annualizedVol} />
        {roiResult && (
          <div
            className="max-w-full flex flex-col align-start
            justify-between bg-purple-200 border-8 border-black
         rounded-md m-1"
          >
            <h3 className="m-2 text-xl text-center underline">ROI Results</h3>

            <div className="m-2 p-4 flex flex-col">
              <h3 className="text-xl">FLI Token</h3>
              <p>
                Investment Value at End: $
                {fixedNum(
                  calculatorState.expectedVolDecay *
                    calculatorState.initialInvestment +
                    calculatorState.initialInvestment
                )}{' '}
                <br />
              </p>
              <p>
                {' '}
                ROI Percent: {fixedNum(calculatorState.expectedVolDecay * 100)}%
              </p>
            </div>
            <div className="m-2 p-4 flex flex-col">
              <h3 className="text-xl">
                {calculatorState.fliTokenStrategy.toUpperCase()}
              </h3>
              <p>
                Investment Value at End: $
                {fixedNum(
                  roiResult.tokenRoi + calculatorState.initialInvestment
                )}
                <br />
              </p>
              <p> ROI Percent: {calculatorState.percentChange}%</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

RoiDetails.propTypes = {
  finalTokenPrice: number,
  fliIndexProfit: number,
  fliStrategy: string,
  finalFliPrice: number,
  fliRoi: number,
  tokenRoi: number
}
export default RoiDetails
