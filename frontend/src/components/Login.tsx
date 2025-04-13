import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  
  const loginMutation = useMutation({
    mutationFn: (credentials: { email: string, password: string }) => 
      axios.post('http://localhost:8001/token', credentials),
    onSuccess: () => navigate('/posts')
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    loginMutation.mutate({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Datagenie Login</h1>
        <input 
          type="email" 
          name="email"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Email" 
          required
        />
        <input 
          type="password" 
          name="password"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password" 
          required
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}