import { useCallback, useEffect, useState } from "react";
import styles from './Store.module.scss';
import Form from "../../components/Form/Form";
import TextInput from "../../components/Input/TextInput";
import LoadingIndicator from "../../components/LoadingSpinner/LoadingSpinner";
import useStoreStore from "../../stores/storeStore";
import { ItemSearchModel } from "../../types";
import { combineClasses } from "../../utils";

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
      {!items && <LoadingIndicator />}
      <div className={'grid-container'}>
        {!!items &&
          items?.map(item => (
            // todo: remove grid-item class if not needed
            <div key={`grid-item-${item.id}-${item.name}`} className={combineClasses(styles.item, "grid-item")}>
              <div>{item.name}</div>
              <div>${item.cost}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Store;