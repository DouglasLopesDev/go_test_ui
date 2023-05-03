import { IEntity } from '@/utils/entity'
import { Effect, Reducer } from 'umi';
import colors from "@/models/colors";
import locales from "@/locales/pt-BR";

export const namespace = 'projectModel';

export interface IProject extends IEntity {
  cardColor: string,
  name: string,
  description: string,
  customer: string,
  inCharge: string[],
  urls: string[]
}

export const defaultProjectValues: IProject = {
  cardColor: '',
  name: '',
  description: '',
  customer: '',
  inCharge: [],
  urls: []
}

export interface IProjectState{
  project?: IProject,
  projects?: IProject[],
  loading?: boolean,
  listLoading?: boolean,
  projectsCount?: int,
}

export interface IProjectModel {
  namespace: string,
  state: IProjectState,
  effects:{
    postProject: Effect,
    getProject: Effect,
    getProjectById: Effect,
    putProject: Effect
  },
  reducers:{
    save: Reducer<IProjectState>,
  }
}

export enum ProjectEffect {
  Init = 'init',
  PostProject = 'postProject',
  GetProject = 'getProject',
  GetProjectById = 'getProjectById',
  PutProject = 'putProject'
}

export enum ProjectReducer {
  Save = 'save',
}

export enum ProjectDispatch {
  Init = `${namespace}/${ProjectReducer.Save}`,
  Save = `${namespace}/${ProjectEffect.Save}`,
  PostProject = `${namespace}/${ProjectEffect.PostProject}`,
  GetProject = `${namespace}/${ProjectEffect.GetProject}`,
  GetProjectById = `${namespace}/${ProjectEffect.GetProjectById}`,
  PutProject = `${namespace}/${ProjectEffect.PutProject}`,

}

export const dispatcherFactory = (dispatch: any) => {
  return {
    postProject: (request: IProject) => {
      dispatch({
        type: ProjectDispatch.PostProject,
        payload: request,
      })
    },
    getProject: (request: any = undefined) => {
      dispatch({
        type: ProjectDispatch.GetProject,
        payload: request,
      })
    },
    getProjectById: (request: any = undefined) => {
      dispatch({
        type: ProjectDispatch.GetProject,
        payload: request,
      })
    },
    putProject: (request: IProject) => {
      dispatch({
        type: ProjectDispatch.PutProject,
        payload: request,
      })
    },
  }
}

export const ProjectListColumns : ListColumns[] = [
  {
    dataIndex: "name",
    label: locales["layout.name"],
    type: 'text',
    searchable: true,
  },
  {
    dataIndex: "customer",
    label: locales["layout.customer"],
    type: 'text',
    searchable: true,
  },
  {
    dataIndex: "inCharge",
    name: "inCharge",
    label: locales["layout.inCharge"],
    type: 'text',
    searchable: true,
    render: (inCharge: string[]) => inCharge ? inCharge[0] : ''
   },
]
