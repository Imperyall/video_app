import {
  CHANGE_RESOLUTION,
  TAKE_PHOTO,
  CHANGE_NAME
} from "../actions/action-types";

import { RESOLUTIONS } from "../constants";

const initialState = {
  resolution: RESOLUTIONS[0],
  currentPhoto: { id: 0, src: "", name: "" }, // { id, src, name }
  photos: [] // [{ id, src, name }]
};

const createName = ext =>
  `${new Date()
    .toLocaleDateString()
    .split(".")
    .join("-")}.${ext}`;

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RESOLUTION: {
      if (RESOLUTIONS.includes(action.payload)) {
        return {
          ...state,
          resolution: action.payload
        };
      }

      return state;
    }
    case TAKE_PHOTO: {
      const id = state.photos.length;
      const name = createName("png");

      const currentPhoto = {
        id: state.photos.length,
        src: action.payload,
        name
      };

      return {
        ...state,
        currentPhoto,
        photos: [...state.photos, currentPhoto]
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        photos: state.photos.map(photo => {
          if (photo.id === action.payload.id) {
            photo.name = action.payload.name;
          }

          return photo;
        })
      };
    }
    default:
      return state;
  }
};
