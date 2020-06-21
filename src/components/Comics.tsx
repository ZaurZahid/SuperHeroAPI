import React, {FunctionComponent, useState, useEffect} from 'react'
import './Comics.css'

interface Props {
  searchVal: string
}
interface HeroSearched {
  name1: string
  name2: string
  imageUrl: string
  description: string
}
const Comics: FunctionComponent<Props> = ({searchVal}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [search, setSearch] = useState<HeroSearched>({
    name1: '',
    name2: '',
    imageUrl: '',
    description: ''
  })

  useEffect(() => {
    if (searchVal !== '') {
      fetch(`https://www.superheroapi.com/api.php/2705085199724900/search/${searchVal}`).then(
        (res) => {
          setLoading(true)

          if (res.status !== 200) {
            setLoading(false)
            setErr('not worked')
            return
          }

          res.json().then((data) => {
            console.log(data.response)
            if (data.response === 'success') {
              setLoading(false)
              setErr('')
              setSearch({
                name1: data.results[0].name,
                name2: data.results[0].biography['full-name'],
                imageUrl: data.results[0].image.url,
                description: data.results[0].connections.relatives
              })
              console.log(data.results[0])
            } else {
              setLoading(false)
              setErr('Character with given name not found')
              return
            }
          })
        }
      )
    }
  }, [searchVal])

  let result
  if (err) {
    result = searchVal ? <h6 className="err"> {err}.</h6> : null
  } else {
    result =
      searchVal && (search.name1 || search.name2 || search.description || search.imageUrl) ? (
        <div className="comics">
          <div className="avatar">
            <img src={search.imageUrl} alt={search.name1} />
          </div>
          <div className="content">
            <h1 className="com-name">{search.name1}</h1>
            <h2 className="original-name">{search.name2}</h2>
            <p className="com-description">{search.description}</p>
          </div>
        </div>
      ) : null
  }
  return <div>{loading ? 'loading...' : result}</div>
}
export default Comics
