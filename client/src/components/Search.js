import React, { useState } from 'react'
import { Icon } from "semantic-ui-react";

const Searching = (props) => {
  const [search, setSearch] = useState('')

  return (
    <form onSubmit={(e) => props.searchEvent(e, search)}>
      <input style={{ width: "80%"}}onChange={(e) => setSearch(e.target.value)} />
      <button onClick={(e) => props.searchEvent(e, search)} name="search"  ><Icon name="search"/></button>
    </form>
  )
}

export default Searching

