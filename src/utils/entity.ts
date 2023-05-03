export interface IEntity {
  object_key?: string,
  owner?: IUserTrack,
  modifiedBy?: IUserTrack,
  createdBy?: IUserTrack,
  modifiedOn?: string,
  createdOn?: string
}

export interface IUserTrack {
  id: string,
  email: string,
  name: string,
}

export const defaultUserTrack : IUserTrack = {
  id: "",
  email: "",
  name: "",
}
