import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  ,
)

/*
 - to improve
 - make it PWA
 - local db first / sync when update received

 - current score
 - timer
*/
