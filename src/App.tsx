import { useState } from 'react';
import { ArrowSquareUpRight, GithubLogo } from 'phosphor-react';

interface Repo {
  name: string;
  html_url: string;
  language: string;
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
      setRepos([]);
      setError(error);
    });
  }
  console.log(repos)

  return (
    <div className="App mt-20">
      <div className='flex flex-col items-center'>
        <div className='flex flex-col mb-4 items-center'>
          <GithubLogo className='text-9xl text-gray-900' />
          <p className='text-3xl font-medium'>
            Github Repo Filter
          </p>
        </div>
        <div className='flex flex-col items-center mb-4 w-2/4'>
          <div className='mb-4'>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
              <input 
                name='search-user'
                className='border-b border-black'
                type="text" 
                placeholder='Digite o nome do usuário'
                value={user}
                onChange={e => setUser(e.target.value)}
              />
              <button className='mt-4 p-2 bg-slate-200 rounded-md hover:bg-slate-300 duration-300'>
                Buscar
              </button>
            </form>
          </div>
          {repos.length > 0 ? (
            <div className='flex flex-col w-3/5'>
              <input
                name='search-repo'
                className='border-b border-black mb-4' 
                type="text"
                placeholder='Filtre o repositório'
                onChange={e => setSearch(e.target.value)}
                value={search}
                />          
              {search.length > 0 ? ( 
                <div>
                  {filteredRepos.map(repo => {
                    return (
                      <div className='flex' key={repo.name}>
                        <p className='text-lg font-medium'>
                          {repo.name}
                        </p>
                        <p className='flex ml-2 text-sm text-blue-400 items-center'>
                          {repo.language}
                        </p>
                        <a className='flex items-center' href={repo.html_url}>
                          <ArrowSquareUpRight className='text-xl ml-2 hover:text-blue-800' />
                        </a>                                        
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div>
                  {repos.map(repo => {
                    return (
                      <div className='flex' key={repo.name}>
                        <p className='text-lg font-medium'>
                          {repo.name}
                        </p>
                        <p className='flex ml-2 text-sm text-blue-400 items-center'>
                          {repo.language}
                        </p>
                        <a className='flex items-center' href={repo.html_url}>
                          <ArrowSquareUpRight className='text-xl ml-2 hover:text-blue-800' />
                        </a>  
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          
          ) : (
            <div className='flex justify-center'>
              {error ? (
                <div>
                  <p className='text-red-500 font-bold'>
                    Usuário não encontrado
                  </p>
                </div>
              ) : (
                <>
                </>
              )}        
            </div>
          )}
        </div>
      </div>        
    </div>
  );
}

export default App;