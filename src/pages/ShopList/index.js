import React from 'react';
import InputList from '../../components/InputList';

export default function ShopList(props) {
  const [items, setItems] = useStickyState(
    props.location.state && props.location.state.ingredients
      ? props.location.state.ingredients
      : [],
    'shop-list',
  );

  function handleOnChange(newList) {
    setItems(newList);
  }

  // https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
  function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null && stickyValue !== '[]'
        ? JSON.parse(stickyValue).concat(defaultValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  return (
    <div>
      <h1 style={{ marginTop: 48 }}>Lista de Compras</h1>
      <InputList
        shopList
        items={items}
        checkbox
        onChange={newList => handleOnChange(newList)}
      />
    </div>
  );
}
