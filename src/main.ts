import './app.css'
import App from './App.svelte'

const createApp = () => {
  let app: App | undefined

  document.addEventListener('DOMContentLoaded', () => {
    app = new App({
      target: document.getElementById('app-4dfkr3') as HTMLElement,
})
  })

  return app
}

export default createApp()