import React from 'react'
import { Provider } from 'react-redux'
import initStore, { configureStore } from '../../store/store'
import { JsonFormsReduxContext } from "@jsonforms/react";
import App from 'next/app'

import { Actions } from '@jsonforms/core';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = initStore(initialReduxState)
    return (
      <Provider store={store}>
        <JsonFormsReduxContext>
          <PageComponent {...props} />
        </JsonFormsReduxContext>
      </Provider>
    )
  }

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App
    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents')
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    WithRedux.displayName = `withRedux(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async context => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = initStore()

      // Provide the store to getInitialProps of pages
      context.reduxStore = reduxStore

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context)
          : {}

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState()
      }
    }
  }

  return WithRedux
}