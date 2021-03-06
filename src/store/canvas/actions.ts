import { ActionTree } from "vuex";
import { IcanvasState } from "./models";
import { RootState } from "../RootState";

import firebase from "firebase/app";
import "firebase/firestore";

export const actions: ActionTree<IcanvasState, RootState> = {
  async getCanvas({ commit }) {
    const canvasList: Array<Object> = [];
    await firebase.firestore().collection('canvas').get().then((snapShot: any) => {
      snapShot.forEach((doc: any) => {
        const canvasData = {
          ...doc.data(),
          docId: doc.id,
        };
        canvasList.push(canvasData);
      });
    }).catch((error: any) => {
      console.log(error);
    });
    commit("setCanvasList", canvasList);
  },
  async addCanvas({ state, commit }) {
    const data: any = {};
    state.canvas.forEach((item: any) => {
      data[item.keyName] = item.value;
    })
    await firebase.firestore().collection('canvas').add(
      data
    ).then(docRef => {
      console.log("Id of new data is", docRef.id);
    }).catch(error => {
      console.error(error);
    });

    commit("initCanvas");
  },
  setCanvasValue({ state, commit }, payload) {
    for (let i in state.canvas) {
      commit("changeCanvasValue", {
        key: state.canvas[i].id,
        value: payload[state.canvas[i].keyName],
      });
    }
  },
  async updateCanvas({ state, commit }) {
    const data: any = {};
    state.canvas.forEach((item: any) => {
      data[item.keyName] = item.value;
    })

    await firebase.firestore().collection('canvas').doc(state.currentDocId).update(
      data
    ).then(() => {
      commit("initCurrentDocId");
      commit("initCanvas");
    }).catch(error => {
      console.error(error);
    });
  },
  error({ commit }, payload) {
    commit("setErrorMessage", payload);
  },
};