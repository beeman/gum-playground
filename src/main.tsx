import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from './app/app'

// Buffer on the Window object
// eslint-disable-next-line @typescript-eslint/no-var-requires
window.Buffer = window.Buffer || require('buffer').Buffer

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
