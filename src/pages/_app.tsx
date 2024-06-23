import React from 'react'
import '../styles/globals.css'
import DarkModeLayout  from '../components/layout'
import { UserProvider } from '../context/context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../store/store'
import {persistStore} from 'redux-persist'
import ReactLoader from '../components/loader'
export default function App({ Component, ...rest }):React.ReactElement {
  const {store,props}=wrapper.useWrappedStore(rest)
  const persistor= persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<ReactLoader/>}>
    <DarkModeLayout>
    <UserProvider>
       <Component {...props.pageProps} />
    </UserProvider>
  </DarkModeLayout>
  </PersistGate>
  </Provider>
  )
}
