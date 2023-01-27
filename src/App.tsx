import { useState } from 'react';

interface Repo {
  name: string;
  description: string;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const filteredRepos = search.length > 0
    ? repos.filter(repo => repo.name.includes(search))
    : []
  
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${user}/repos`).then((response) => {
      if (response.ok) {
        return response.json()
          .then(data => setRepos(data));
      }
      throw new Error('Something went wrong');
    })
    .catch((error) => {
      setError(error)
    });
  }

  return (
    <div className="App flex flex-col items-center mt-20">
      <div>
        <div className='mb-4'>
          <form onSubmit={handleSubmit}>
            <input 
              name='search-user'
              className='border-b border-black'
              type="text" 
              placeholder='Digite o nome do usuário'
              value={user}
              onChange={e => setUser(e.target.value)}
            />
            <button className='ml-4 p-1 bg-slate-300 rounded-md'>
              Buscar
            </button>
          </form>
        </div>
        {repos.length > 0 ? (
          <div>
            <input
              name='search-repo'
              className='border-b border-black mb-4' 
              type="text"
              placeholder='Filtre o repositório'
              onChange={e => setSearch(e.target.value)}
              value={search}
              />          
            {search.length > 0 ? ( 
              <ul>
                {filteredRepos.map(repo => {
                  return (
                    <li key={repo.name}>
                      {repo.name}                                        
                    </li>
                  )
                })}
              </ul>
            ) : (
              <ul>
                {repos.map(repo => {
                  return (
                    <li key={repo.name}>
                      {repo.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        
        ) : (
          <div>
            {error ? (
              <div>
                Usuário não encontrado
              </div>
            ) : (
              <>
              </>
            )}        
          </div>
        )}      
      </div>      
    </div>
  );
}

export default App;