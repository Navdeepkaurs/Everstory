import { useQuery } from 'react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Posts() {
  const navigate = useNavigate()
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('http://localhost:8001/posts').then(res => res.data)
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Posts</h1>
      <button 
        onClick={() => navigate('/')}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
      >
        Back to Login
      </button>
      
      <div className="grid grid-cols-3 gap-4">
        {posts?.map((post: any) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="font-bold">{post.title}</h2>
            <img src={post.image_url} alt={post.title} className="mt-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}