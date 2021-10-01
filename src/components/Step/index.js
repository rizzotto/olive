import { Button as MaterialButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import ImageButton from '../ImageButton';
import Input from '../Input';
import useStyles from './styles';

const Step = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const {
    number,
    title,
    description,
    stepPosition,
    onChangeTitle,
    onChangeDescription,
    onClickDeleteButton,
    onImageChange,
    onImageDelete,
    image,
    ...others
  } = props;

  function handleStepImageAdd(img) {
    onImageChange(img);
  }

  function handleOnChange(e, callback) {
    callback(e.target.value);
  }

  function handleOnImageDelete() {
    if (onImageDelete) onImageDelete();
  }

  const color = stepPosition !== 0 && '#FF1B25';

  return (
    <div className={classes.content} ref={ref}>
      {/*Step number*/}
      <div className={classes.number}>{number}</div>

      <div className={classes.step}>
        {/*Title input*/}
        <Input
          className={classes.input}
          label="Título"
          defaultValue={title}
          onChange={e => handleOnChange(e, onChangeTitle)}
        />

        {/*Description input*/}
        <Input
          rows={6}
          multiline
          label="Descrição do passo"
          defaultValue={description}
          onChange={e => handleOnChange(e, onChangeDescription)}
          {...others}
        />

        <ImageButton
          getImage={handleStepImageAdd}
          image={image}
          onDelete={handleOnImageDelete}
          key={image ? image.size : 0}
        ></ImageButton>
        <MaterialButton
          style={{
            color: color,
            marginBottom: -7,
            marginTop: 20,
            borderRadius: 6,
          }}
          size="small"
          onClick={onClickDeleteButton}
          disabled={stepPosition === 0}
        >
          Deletar Passo
        </MaterialButton>
      </div>
    </div>
  );
});

Step.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

Step.defaultProps = {
  title: '',
  description: '',
};

export default Step;
