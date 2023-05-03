import { Effect, Reducer } from "umi";

export const namespace = 'customerModel';

export interface ICustomerState {
  name: string,
  address: string,
}


export interface ICustomerModel {
  namespace: string,
  state: ICustomerState,
  effects:{
    postCustomer: Effect,
    getCustomer: Effect,
    getCustomerById: Effect,
    putCustomer: Effect
  },
  reducers:{
    save: Reducer<ICustomerState>,
  }
}
