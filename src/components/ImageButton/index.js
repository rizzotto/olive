import CameraIcon from '@material-ui/icons/CameraAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Sheet from 'react-modal-sheet';
import Button from '../Button';
import useStyles from './styles';

export default function ImageButton({ getImage, fileName, image, onDelete }) {
  const classes = useStyles();

  const inputFile = useRef(null);
  const [upImg, setUpImg] = useState();
  const [isCropped, setCropped] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [bidum, setBidum] = useState(image ? URL.createObjectURL(image) : null);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = null;
    setOpen(true);
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  function getCroppedImg() {
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise(resolve => {
      canvas.toBlob(
        blob => {
          blob.name = fileName;
          resolve(blob);
        },
        'image/jpeg',
        1,
      );
    });
  }

  async function onClose() {
    setCropped(true);
    setOpen(false);
    const croppedImg = await getCroppedImg();
    if (getImage) getImage(croppedImg);
  }

  function clear() {
    setCrop({ unit: '%', width: 100, aspect: 16 / 9 });
    setCompletedCrop(null);
    setUpImg(null);
    setCropped(false);
    setBidum(null);
  }

  function removeImage() {
    clear();
    if (onDelete) onDelete();
  }

  function selectFile() {
    inputFile.current.click();
  }

  return (
    <div className={classes.container}>
      <div
        className={classes.image}
        style={isCropped || bidum ? {} : { display: 'none' }}
      >
        <div className={classes.overlayCenter}>
          <DeleteIcon className={classes.icon} onClick={() => removeImage()} />
        </div>
        {/* <div className={classes.overlayRight}>
          <ImageIcon className={classes.icon} onClick={() => setOpen(true)} />
        </div> */}
        {previewCanvasRef && !bidum && (
          <canvas ref={previewCanvasRef} className={classes.canvas} />
        )}
        {previewCanvasRef.current === null && bidum && (
          <img src={bidum} className={classes.canvas} />
        )}
      </div>

      <Button
        className={classes.buttonImage}
        text="Selecionar Imagem"
        color="secondary"
        endIcon={<CameraIcon />}
        onClick={() => selectFile()}
        style={isCropped || bidum ? { display: 'none' } : {}}
      />

      <input
        type="file"
        accept="image/*"
        minWidth="100"
        className={classes.input}
        ref={inputFile}
        onChange={onSelectFile}
        onClick={() => setUpImg(null)}
      />

      <div>
        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <Sheet.Header
              style={{
                textAlign: 'center',
              }}
            >
              <h1>Cortar Imagem</h1>
            </Sheet.Header>
            <Sheet.Content disableDrag>
              <ReactCrop
                style={{ marginRight: 45, marginLeft: 45 }}
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={c => setCompletedCrop(c)}
              />
            </Sheet.Content>

            <Button
              style={{ marginTop: 20 }}
              text="Cortar Imagem"
              color="primary"
              onClick={() => onClose()}
            />
          </Sheet.Container>

          <Sheet.Backdrop />
        </Sheet>
      </div>
    </div>
  );
}

ImageButton.propTypes = {
  getImage: PropTypes.func,
  fileName: PropTypes.string,
};

ImageButton.defaultProps = {
  fileName: 'file.jpeg',
};
