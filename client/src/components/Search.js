import React, { useState } from 'react'

const Searching = (props) => {
  const [search, setSearch] = useState('')

  return (
    <form onSubmit={(e) => props.searchEvent(e, search)}>
      <input onChange={(e) => setSearch(e.target.value)} />
      <button onClick={(e) => props.searchEvent(e, search)} icon="search" />
    </form>
  )
}

export default Searching

