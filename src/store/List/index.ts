import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export * from "./sagas";

interface ListState {
  loading: boolean;
  intro: GalleryUnit | null;
  paintings: GalleryUnit[];
  paintingsOrder: OrderType;
  painting: GalleryUnit | null;
  drawings: GalleryUnit[];
  photographs: GalleryUnit[];
  contact: ContactUnit | null;
}

const initialState: ListState = {
  loading: false,
  intro: null,
  paintings: [],
  paintingsOrder: [],
  painting: null,
  drawings: [],
  photographs: [],
  contact: null,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    paintingsListInit: (state) => ({
      ...state,
      loading: true,
      intro: null,
      paintings: [],
      paintingsOrder: [],
    }),
    paintingsListSuccess: (state, action: PayloadAction<PAINTINGLIST>) => ({
      ...state,
      loading: false,
      intro: action.payload.intro,
      paintings: action.payload.paintings,
      paintingsOrder: action.payload.paintingsOrder,
    }),
    paintingsListFailure: (state) => ({
      ...state,
      loading: false,
    }),
    paintingsOrderInit: (state) => ({
      ...state,
      loading: true,
      paintingsOrder: [],
    }),
    paintingsOrderSuccess: (
      state,
      action: PayloadAction<{ paintingsOrder: OrderType }>
    ) => ({
      ...state,
      loading: false,
      paintingsOrder: action.payload.paintingsOrder,
    }),
    paintingsOrderFailure: (state) => ({
      ...state,
      loading: false,
    }),
    paintingInit: (state, action: PayloadAction<{ id: React.Key }>) => ({
      ...state,
      loading: true,
      painting: null,
    }),
    paintingSuccess: (
      state,
      action: PayloadAction<{ painting: GalleryUnit }>
    ) => ({
      ...state,
      loading: false,
      painting: action.payload.painting,
    }),
    paintingFailure: (state) => ({
      ...state,
      loading: false,
    }),
    photoListInit: (state) => ({
      ...state,
      loading: true,
      photographs: [],
    }),
    photoListSuccess: (
      state,
      action: PayloadAction<{ photos: GalleryUnit[] }>
    ) => ({
      ...state,
      loading: false,
      photographs: action.payload.photos,
    }),
    photoListFailure: (state) => ({
      ...state,
      loading: false,
    }),
    drawingsListInit: (state) => ({
      ...state,
      loading: true,
      drawings: [],
    }),
    drawingsListSuccess: (
      state,
      action: PayloadAction<{ drawings: GalleryUnit[] }>
    ) => ({
      ...state,
      loading: false,
      drawings: action.payload.drawings,
    }),
    drawingsListFailure: (state) => ({
      ...state,
      loading: false,
    }),
    contactInit: (state) => ({
      ...state,
      loading: true,
      contact: null,
    }),
    contactSuccess: (
      state,
      action: PayloadAction<{ contact: ContactUnit }>
    ) => ({
      ...state,
      loading: false,
      contact: action.payload.contact,
    }),
    contactFailure: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const {
  paintingsListInit,
  paintingsListSuccess,
  paintingsListFailure,
  paintingsOrderInit,
  paintingsOrderSuccess,
  paintingsOrderFailure,
  paintingInit,
  paintingSuccess,
  paintingFailure,
  photoListInit,
  photoListSuccess,
  photoListFailure,
  drawingsListInit,
  drawingsListSuccess,
  drawingsListFailure,
  contactInit,
  contactSuccess,
  contactFailure,
} = listSlice.actions;
export default listSlice.reducer;
