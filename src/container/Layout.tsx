import React, {useState, FunctionComponent} from 'react'
import Comics from '../components/Comics'
import './Layout.css'

const Layout: FunctionComponent = () => {
  const [value, setValue] = useState<string>('')

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  let header
  if (value) {
    header = (
      <h1 className="s-header">
        Searching for <span id="searching-val">{value}</span>
      </h1>
    )
  } else {
    header = <h1 className="s-header">Search your favorite comic</h1>
  }
  return (
    <React.Fragment>
      <div className="srch">
        {header}
        <input
          type="text"
          placeholder="Search for your favourite comic"
          value={value}
          onChange={(e) => handleChangeInput(e)}
          className="s-input"
        />
      </div>
      <Comics searchVal={value} />
    </React.Fragment>
  )
}
export default Layout
