import React  ,{useState , useEffect} from 'react';
import './style.css';

export default function App() {

  const[news,setNews]=useState([]);
  const [searchQ ,setSearchQ]=useState("react");
  const [url ,setUrl]=useState(`https://hn.algolia.com/api/v1/search?query=${searchQ}`);
  const [loading,setLoading]=useState(true);

  const fetchNews =()=>{
      fetch(url)
      .then((resp)=>resp.json())
      .then((data)=>(setNews(data.hits),setLoading(false)))
      .catch((err)=>console.log(err));
  }

  useEffect(()=>{
    fetchNews();
  },[url]);


  const handle=(e)=>{
    setSearchQ(e.target.value);
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQ}`);
  }

  return (
    <div>
      <header>
      <h1 className="head">NEWS!</h1>
      </header>
      {loading ? <h2> Loading...</h2> :""}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQ} onChange={handle}/>
        <button>Search</button>
      </form>
      {
        news.map((n,i)=>(
          <p key={i}>{n.title}</p>   
        ))
      }
      
    </div>
  );
}
