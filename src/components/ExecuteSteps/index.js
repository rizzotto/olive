import { CircularProgress, IconButton } from '@material-ui/core';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Button from '../../components/Button';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import getPlaceholder from '../../constants/placeholderIcons';
import { storage } from '../../services/firebase';
import StyledDiv from '../../utils/styledDiv';
import useStyles from './styles';

export default function ExecuteSteps(props) {
  const classes = useStyles();
  const { recipe, steps, voice } = props.location.state;
  const [stepIndex, setStepIndexValue] = useState(0);
  const [loadingImages, setLoadingImages] = useState(true);
  const [images, setImages] = useState([]);
  const history = useHistory();
  const [voiceEnabled, setVoiceEnabled] = useState(voice);
  const commands = [
    {
      command: 'próximo',
      callback: () => {
        resetTranscript();
        handleNextStep(stepIndex + 1);
      },
    },
    {
      command: 'voltar',
      callback: () => {
        resetTranscript();
        handlePreviousStep(stepIndex - 1);
      },
    },
    {
      command: 'finalizar',
      callback: () => {
        resetTranscript();
        history.push(`/recipe-finished`, { recipe_id: recipe.recipe_id });
      },
    },
    {
      command: 'Passo *',
      callback: step => {
        const four = step === 'quatro';
        resetTranscript();
        setStepIndexValue(parseInt((four ? '4' : step) - 1));
      },
    },
  ];

  const { resetTranscript } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (voiceEnabled) {
      SpeechRecognition.startListening({ language: 'pt-BR', continuous: true });
    }
    const images = steps.map(step => {
      var format;
      if (step.media_format) {
        format = step.media_format.split('/')[1];
        return storage
          .child(
            `/recipes/${recipe.recipe_id}/steps/${step.position}/media.${format}`,
          )
          .getDownloadURL()
          .catch(getPlaceholder());
      } else return getPlaceholder();
    });
    Promise.all(images).then(images => {
      setImages(images);
      setLoadingImages(false);
    });
  }, []);

  useEffect(() => {
    if (voiceEnabled) {
      SpeechRecognition.startListening({ language: 'pt-BR', continuous: true });
    }
    if (!voiceEnabled) {
      SpeechRecognition.stopListening();
    }
  }, [voiceEnabled]);

  const handleNextStep = () => {
    if (stepIndex + 1 == steps.length) {
      SpeechRecognition.stopListening();
      history.push(`/recipe-finished`, { recipe_id: recipe.recipe_id });
    }
    setStepIndexValue(stepIndex + 1);
  };

  const handlePreviousStep = () => {
    if (stepIndex == 0) {
      SpeechRecognition.stopListening();
      history.push(`/recipe/${recipe.recipe_id}`, { recipe });
    }
    setStepIndexValue(stepIndex - 1);
  };

  function handleSpeech() {
    setVoiceEnabled(!voiceEnabled);
  }

  return (
    <>
      <div className={classes.navigationHeader}>
        <div>
          <IconButton onClick={handlePreviousStep} style={{ padding: 0 }}>
            <ArrowBackIosOutlinedIcon color="secondary" />
          </IconButton>
          <span className={classes.headerStepBack} onClick={handlePreviousStep}>
            {stepIndex == 0 ? 'Sair da Execução' : 'Passo Anterior'}
          </span>
        </div>
        <IconButton onClick={() => handleSpeech()} style={{ padding: 0 }}>
          {voiceEnabled ? (
            <MicNoneOutlinedIcon color="secondary" />
          ) : (
            <MicOffOutlinedIcon color="secondary" />
          )}
        </IconButton>
      </div>

      {steps && (
        <>
          <h1 style={{ alignSelf: 'flex-start' }}>{steps[stepIndex].title}</h1>
          <LinearProgressWithLabel value={stepIndex + 1} total={steps.length} />
          <div className={classes.content}>
            {!loadingImages && (
              <img
                src={images[stepIndex] || getPlaceholder()}
                onError={() => setLoadingImages(false)}
                style={{ width: '100%' }}
              />
            )}
            {loadingImages && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress color="secondary" />
              </div>
            )}
            <p className={classes.description}>
              {steps[stepIndex].description}
            </p>
          </div>

          <StyledDiv>
            <Button
              color="secondary"
              text={
                stepIndex + 1 == steps.length ? 'Concluir' : 'Proximo Passo'
              }
              onClick={() => handleNextStep(stepIndex + 1)}
              style={{ width: 220, bottom: 45 }}
            />
          </StyledDiv>
        </>
      )}
    </>
  );
}
