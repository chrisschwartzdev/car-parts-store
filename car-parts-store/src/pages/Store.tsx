import { useCallback, useEffect, useState } from "react";
import Form from "../components/Form/Form";
import TextInput from "../components/Input/TextInput";
import useStoreStore from "../stores/storeStore";
import { ItemSearchModel } from "../types";


const Store = () => {
  const { items, fetchItems } = useStoreStore(it => ({ items: it.items, fetchItems: it.fetchItems }))
  const [search, setSearch] = useState<ItemSearchModel>({});

  useEffect(() => { fetchItems() }, [fetchItems])

  const handleSearchClicked = useCallback(() => {
    fetchItems(search)
  }, [fetchItems, search])

  return (
    <div>
      <Form unstyled>
        <TextInput autoFocus placeholder="Enter keywords..." onChange={val => setSearch({ ...search, query: val })} />
        <button type="submit" onClick={handleSearchClicked}><i className="fa fa-magnifying-glass" /></button>
      </Form>
      <div className='grid-container'>
        {items.map(item => (
          <div key={`grid-item-${item.id}-${item.name}`} className="grid-item">
            <div>{item.name}</div>
            <div>{item.cost}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store;