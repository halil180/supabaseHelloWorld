import React, { useEffect ,useState} from 'react'
import supabase from "../ config/supabaseClient"
import SmoothieCard from '../components/SmoothieCard'



function Home() {

  const [fetchError,setFetchError] = useState(null)
  const [smoothies,setSmoothies] = useState(null)
  const [orderBy,setOrderBy] = useState("created_at")

  const delteThis  = async (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(sm => sm.id !== id )
    })
  }
  useEffect(() => {
    const fetchSmoothies = async () => {
      const {data,error} = await supabase
      .from("smoothies")
      .select()
      .order(orderBy)




      if (error) {
        setFetchError("Could not fetch the smoothies")
        console.log(error)
        setSmoothies(null)
        }
        if (data) {
          setSmoothies(data)
          setFetchError(null)
          console.log(data)
        }
    }
    fetchSmoothies()

  }, [orderBy])
  
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
         <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} delteThis={delteThis} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home