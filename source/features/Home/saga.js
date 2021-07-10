import { call, takeLatest, put } from 'redux-saga/effects'
import {
  fetchHistoricalData,
  reportSuccess,
  reportError,
  setHistoricalData,
  setHistoricalFliData
} from './reducer'
import { fetchCoingeckoData } from '../../shared/APIs'
import { makeRangeUrl, aggregateReducer } from '../../shared/utils'
import { buildVolDecayStats } from '../../shared/utils/volatility-decay'
import { setFliTokenStrategy, setVolDecayStats } from '../Calculator/reducer'
import { fetchData } from '../RoiDetails/reducer'
const map = {
  eth: {
    underlying: 'ethereum',
    fli: 'eth-2x-flexible-leverage-index'
  },
  btc: {
    underlying: 'bitcoin',
    fli: 'btc-2x-flexible-leverage-index'
  }
}

const applyAggregationFn =
  (reducerFn, initialValue = []) =>
  (data) =>
    data.reduceRight(reducerFn, initialValue)

const aggregatePriceData = applyAggregationFn(aggregateReducer, [])

function* fetchTokenDataSaga(action) {
  try {
    // TODO: remove hardcoded map.eth value for other FLI products
    const underlyingTokenRespose = yield call(
      fetchCoingeckoData,
      makeRangeUrl(map[action.payload].underlying)
    )
    const fliTokenResponse = yield call(
      fetchCoingeckoData,
      makeRangeUrl(map.eth.fli)
    )
    console.log({ underlyingTokenRespose, fliTokenResponse })
    yield put(
      reportSuccess({
        underlyingToken: aggregatePriceData(underlyingTokenRespose.prices),
        fliToken: aggregatePriceData(fliTokenResponse.prices)
      })
    )
  } catch (error) {
    yield put(reportError(error))
  }
}

function* handleHistoricalDataSaga(action) {
  const { payload } = action
  yield put(setHistoricalData(payload.underlyingToken))
  yield put(setHistoricalFliData(payload.fliToken))
}

function* handleVolDecayCalculation(action) {
  const { payload } = action
  yield put(setVolDecayStats(buildVolDecayStats(payload)))
}

export default function* fetchTokenWatcher() {
  yield takeLatest(fetchData().type, fetchTokenDataSaga)
  yield takeLatest(setFliTokenStrategy().type, fetchTokenDataSaga)

  yield takeLatest(reportSuccess().type, handleHistoricalDataSaga)
  yield takeLatest(setHistoricalData().type, handleVolDecayCalculation)
}
