import { call, takeLatest, put } from 'redux-saga/effects'
import { fetchData, reportSuccess, reportError } from './reducer'
import { setFliTokenStrategy, setTokenData } from '../Calculator/reducer'
import { fetchCoingeckoData, currentPrice } from '../../shared/APIs'

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

function* fetchTokenDataSaga(action) {
  try {
    // eslint-disable-next-line no-unused-vars
    const { payload } = action
    console.log(
      'inside fethcTokenDataSaga::: getting currentPrice data@@action',
      { action, payload, lookup: map[payload] }
    )
    const response = yield call(
      fetchCoingeckoData,
      currentPrice(
        `${map[payload.toLowerCase()].underlying},${
          map[payload.toLowerCase()].fli
        }`
      )
    )
    yield put(reportSuccess(response))
  } catch (error) {
    yield put(reportError(error))
  }
}

function* handleSuccessSaga(action) {
  const { payload } = action
  yield put(setTokenData(payload))
}
export default function* fetchTokenWatcher() {
  yield takeLatest(fetchData().type, fetchTokenDataSaga)
  yield takeLatest(setFliTokenStrategy().type, fetchTokenDataSaga)
  yield takeLatest(reportSuccess().type, handleSuccessSaga)
}
