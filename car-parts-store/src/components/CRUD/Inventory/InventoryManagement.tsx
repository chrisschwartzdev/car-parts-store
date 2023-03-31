import { useCallback, useEffect, useRef, useState } from "react";
import useAppStore from "../../../stores/appStore";
import useInventoryStore from "../../../stores/inventoryStore";
import { Item, ItemTag } from "../../../types";
import Form from "../../Form/Form";
import TextInput from "../../Input/TextInput";
import LoadingSpinner, { LoadingSpinnerOrNode } from "../../LoadingSpinner/LoadingSpinner";

const AddItemForm = () => {
  const { addItem, loadingState, subscribe, unsubscribe } = useInventoryStore();
  const { popModal } = useAppStore();
  const [state, setState] = useState<Partial<Item>>({ id: 0, name: "New Item", cost: 0, tags: [] })

  const error = useRef<Error | undefined>();

  useEffect(() => {
    const key = subscribe(err => {
      error.current = err;
      if (!err)
        popModal();
    })
    return () => unsubscribe(key)
  }, [popModal, subscribe, unsubscribe])

  const handleConfirm = useCallback(() => {
    addItem(state as Item);
  }, [addItem, state])

  const loading = loadingState === "add";

  return (
    <Form unstyled>
      <TextInput placeholder="Item Name" autoFocus onChange={(val) => setState({ ...state, name: val })} initialValue={state.name} />
      <button onClick={handleConfirm} disabled={loading}><LoadingSpinnerOrNode loading={loading}>Submit</LoadingSpinnerOrNode></button>
    </Form>
  )
}

const RemoveItemForm = ({ item }: { item: Item }) => {
  const { removeItem, loadingState } = useInventoryStore();
  const { popModal } = useAppStore();

  const handleConfirm = useCallback(() => {
    removeItem(item.id);
    popModal();
  }, [item.id, popModal, removeItem])

  const loading = loadingState === "remove";

  return <button onClick={handleConfirm} disabled={loading}><LoadingSpinnerOrNode loading={loading}>Confirm Deletion</LoadingSpinnerOrNode></button>
}

const InventoryManagement = () => {
  const { items, fetchItems } = useInventoryStore();
  const { showModal } = useAppStore();

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