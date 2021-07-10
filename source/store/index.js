import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { reducer as calculatorInputReducer } from '../features/Calculator/reducer'
import { reducer as tokenPriceReducer } from '../features/RoiDetails/reducer'
import DSM, {
  reducer as volatilityDecayReducer
} from '../features/Home/reducer'

import rootSaga from './sagas'

const defaultState = {
  calculatorState: calculatorInputReducer(),
  tokenDataState: tokenPriceReducer(undefined),
  historicalDataState: DSM.reducer(undefined),
  volatilityDecayState: volatilityDecayReducer(undefined)
}

const initialState = (initialState = defaultState) => {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = combineReducers({
    calculatorState: calculatorInputReducer,
    tokenDataState: tokenPriceReducer,
    historicalDataState: DSM.reducer,
    volatilityDecayState: volatilityDecayReducer
  })
  return {
    ...createStore(
      rootReducer,
      initialState,
      applyMiddleware(...[sagaMiddleware])
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}

export default initialState
