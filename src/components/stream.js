import React, { createRef, useState, useEffect } from "react";

import { Button } from "reactstrap";
import { connect } from "react-redux";

import * as actions from "../actions";

const Stream = props => {
  const [stream, setStream] = useState(null);

  const video = createRef();
  const canvas = createRef();

  const handleButtonClick = _ => {
    const { current } = canvas;
    const [width, height] = props.resolution.split("x");

    current.width = width;
    current.height = height;

    const context = current.getContext("2d");

    context.drawImage(video.current, 0, 0, current.width, current.height);
    const data = current.toDataURL("image/png");
    props.takePhoto(data);
  };

  useEffect(() => {
    video.current.srcObject = stream;

    if (stream) {
      video.current.play();
    }
  }, [video, stream]);

  useEffect(() => {
    const [width, height] = props.resolution.split("x");

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    navigator.mediaDevices
      .getUserMedia({
        video: { width, height },
        audio: false
      })
      .then(stream => setStream(stream))
      .catch(err => console.log(err));
  }, [props.resolution]);

  return (
    <>
      <div className="camera d-flex">
        <video ref={video} className="video rounded flex-grow-1">
          Потоковое видео не поддерживается.
        </video>
        <Button
          id="b_take"
          color="primary"
          size="sm"
          className="controls"
          onClick={handleButtonClick}
        >
          Сделать фото
        </Button>
      </div>
      <canvas ref={canvas} className="d-none"></canvas>
    </>
  );
};

const mapStateToProps = store => ({
  resolution: store.resolution,
});

const mapDispatchToProps = actions;

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
