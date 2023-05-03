import { ICustomerModel, namespace } from "./data.d";

const Model : ICustomerModel = {
  namespace,
  state:{
    name: "",
    address: "",
  },
  effects:{
    *postCustomer(action, effects){

    },
    *getCustomer(action, effects){


    },
    *getCustomerById(action, effects) {

    },
    *putCustomer(action, effects){

    }
  },
  reducers:{
    save(state, {payload}){
      return {
        ...state,
        ...payload,
      };
    }
  }
};

export default Model;
