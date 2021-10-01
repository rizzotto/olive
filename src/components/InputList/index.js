import React, { useState, useRef } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import useStyles from './styles';
import { FiTrash } from 'react-icons/fi';
import Input from '../Input';
import theme from '../../constants/theme';
import PropTypes from 'prop-types';
import Button from '../Button';
function InputList({ checkbox, deleteButton, items, onChange }) {
  const classes = useStyles();
  const [itemsState, setItemsState] = useState(items);
  let timeoutRef = useRef(null);

  function handleNewIngredientClick() {
    setItemsState([...itemsState, '']);
  }

  function handleDeleteButtonClick(id) {
    const newItems = itemsState.filter((item, index) => index !== id);
    setItemsState(newItems);
    onChange(newItems);
  }

  function handleItemChange(event, id) {
    clearTimeout(timeoutRef);
    const newItems = itemsState;
    newItems[id] = event.target.value;
    setItemsState(newItems);
    timeoutRef = setTimeout(function () {
      onChange(newItems);
    }, 1100);
  }

  function clearList() {
    setItemsState([]);
    onChange([]);
  }

  return (
    <div className={classes.list}>
      {itemsState.length !== 0 ? (
        <div className={classes.container}>
          {itemsState.map((item, index) => {
            return (
              <div key={`${item}-${index}`} className={classes.row}>
                {checkbox && (
                  <Checkbox style={{ paddingLeft: 0, paddingRight: 5 }} />
                )}
                <Input
                  placeholder="Novo Ingrediente"
                  hiddenLabel
                  defaultValue={item}
                  onChange={e => handleItemChange(e, index)}
                  autoFocus
                />
                {deleteButton && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteButtonClick(index)}
                    style={{ paddingRight: 0, paddingLeft: 5 }}
                  >
                    <FiTrash color={theme.palette.secondary.main} />
                  </IconButton>
                )}
                <br />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={classes.warningContainer}>
          <span className={classes.warning}>Adicione Novos Ingredientes</span>
        </div>
      )}

      <Button
        variant="outlined"
        color="primary"
        style={{ width: 220, marginBottom: 5 }}
        onClick={() => handleNewIngredientClick()}
        text="Novo Ingrediente"
      />
      {itemsState.length > 0 && (
        <Button
          variant="outlined"
          color="primary"
          style={{ width: 220 }}
          onClick={() => clearList()}
          text="Limpar Lista"
        />
      )}
    </div>
  );
}

InputList.propTypes = {
  checkbox: PropTypes.bool,
  shopList: PropTypes.bool,
  deleteButton: PropTypes.bool,
  itemsProp: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

InputList.defaultProps = {
  checkbox: false,
  shopList: false,
  deleteButton: true,
  items: [],
  onChange: () => {},
};

export default InputList;
