import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

import Stream from "./components/stream";
import * as actions from "./actions";
import { RESOLUTIONS } from "./constants";

import "bootstrap";
import "./App.css";

const App = props => {
  const [search, setSearch] = useState("");

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleResolution = e => {
    props.changeResolution(e.target.value);
  };

  const handleChangeName = id => e => {
    props.changeName({ id, name: e.target.value });
  };

  return (
    <div className="container p-3">
      <Card>
        <CardHeader>
          <CardTitle className="m-0">Заголовок</CardTitle>
        </CardHeader>
        <CardBody>
          <CardTitle>Настройки</CardTitle>
          <Form>
            <FormGroup>
              <Label for="resolutions">Разрешение камеры</Label>
              <Input
                type="select"
                value={props.resolution}
                id="resolutions"
                onChange={handleResolution}
              >
                {RESOLUTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </CardBody>
        <hr className="m-0" />
        <CardBody>
          <Row>
            <Col>
              <Stream />
            </Col>
            <Col className="d-flex">
              <div className="output flex-grow-1">
                {props.currentPhoto.src !== "" && (
                  <>
                    <img
                      id="photo"
                      className="rounded h-100 w-100"
                      src={props.currentPhoto.src}
                      alt={props.currentPhoto.name}
                    />
                    <Input
                      className="controls w-90"
                      onChange={handleChangeName(props.currentPhoto.id)}
                      value={props.currentPhoto.name}
                    />
                  </>
                )}
              </div>
            </Col>
          </Row>
        </CardBody>
        {props.photos.length > 0 && (
          <>
            <hr className="m-0" />
            <CardBody className="pb-0">
              <Input
                className="w-100 mb-3"
                onChange={handleSearch}
                value={search}
              />
              <div className="d-flex flex-wrap">
                {props.photos.reduce((acc, cur) => {
                  if (!cur.name.includes(search)) {
                    return acc;
                  }

                  return [
                    ...acc,
                    <div className="photo_prev" key={cur.id}>
                      <img className="rounded" src={cur.src} alt={cur.name} />
                      <Input
                        onChange={handleChangeName(cur.id)}
                        value={cur.name}
                      />
                    </div>
                  ];
                }, [])}
              </div>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
};

const mapStateToProps = store => ({
  resolution: store.resolution,
  currentPhoto: store.currentPhoto,
  photos: store.photos
});

const mapDispatchToProps = actions;

export default connect(mapStateToProps, mapDispatchToProps)(App);
