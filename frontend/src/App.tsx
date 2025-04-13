import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Posts from './components/Posts'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App