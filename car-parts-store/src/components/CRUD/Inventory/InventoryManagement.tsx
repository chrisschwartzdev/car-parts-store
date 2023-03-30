import { useCallback, useEffect, useState } from "react";
import useAppStore from "../../../stores/appStore";
import useInventoryStore from "../../../stores/inventoryStore";
import { Item, ItemTag } from "../../../types";
import TextInput from "../../Input/TextInput";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const AddItemForm = () => {
  const addItem = useInventoryStore(it => it.addItem);
  const popModal = useAppStore(it => it.popModal);
  const [state, setState] = useState<Partial<Item>>({ id: 0, name: "New Item", cost: 0, tags: [] })

  const handleConfirm = useCallback(() => {
    addItem(state as Item);
    popModal();
  }, [addItem, state, popModal])

  return (
    <div>
      <TextInput placeholder="Item Name" onChange={(val) => setState({ ...state, name: val })} initialValue={state.name} />
      <button onClick={handleConfirm}>Submit</button>
    </div>
  )
}

const RemoveItemForm = ({ item }: { item: Item }) => {
  const removeItem = useInventoryStore(it => it.removeItem);
  const popModal = useAppStore(it => it.popModal);

  const handleConfirm = useCallback(() => {
    removeItem(item.id);
    popModal();
  }, [item.id, popModal, removeItem])

  return (
    <div>
      <button onClick={handleConfirm}>Confirm Deletion</button>
    </div>
  )
}

const InventoryManagement = () => {
  const { items, fetchItems } = useInventoryStore(it => ({ items: it.items, fetchItems: it.fetchItems }));
  const showModal = useAppStore(it => it.showModal);

  useEffect(() => { fetchItems() }, [fetchItems]);

  if (!items)
    return <LoadingSpinner />

  return (
    <div>
      <button onClick={() => showModal({ component: <AddItemForm />, props: { title: "Add Item" } })}>Add Item</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={`${item.id} - ${item.name}`}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.cost}</td>
              <td>{item.tags?.map(it => ItemTag[it]).join(', ')}</td>
              <td>
                <button className="icon-btn" onClick={() => showModal({ component: <RemoveItemForm item={item} />, props: { title: `Are you sure you want to delete "${item.name}"?` } })}><i className="fa fa-trash" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryManagement;