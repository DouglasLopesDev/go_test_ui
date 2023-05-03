import { displayRequestMessage } from '@/utils/errand';
import { namespace, IProjectModel, ProjectReducer } from './data.d';
import service from './service';

const Model: IProjectModel ={
  namespace,
  state:{
    project: undefined,
    projects: undefined,
    loading: false,
    listLoading: false,
    projectsCount: 0,
  },
  effects:{
    *postProject(action, effects){
      const { call, put } = effects;
      const { payload } = action;

      yield put({
        type: ProjectReducer.Save,
        payload: { loading: true },
      });

      var response = yield call(service.postProjects, payload);
      displayRequestMessage(response, false, '/#/projects/list');

      yield put({
        type: ProjectReducer.Save,
        payload: { loading: false}
      })
    },
    *getProject(action, effects){
      const { call, put } = effects;
      const { payload } = action;

      yield put({
        type: ProjectReducer.Save,
        payload: { listLoading: true}
      })

      var response = yield call(service.getProjects, payload);

      yield put({
        type: ProjectReducer.Save,
        payload: { projects: response.data }
      })

      yield put({
        type: ProjectReducer.Save,
        payload: { projectsCount: response.count }
      })

      yield put({
        type: ProjectReducer.Save,
        payload: { listLoading: false}
      })

    },
    *getProjectById(action, effects) {

    },
    *putProject(action, effects){
      const { call, put } = effects;
      const { payload } = action;

      yield put({
        type: ProjectReducer.Save,
        payload: { loading: true },
      });

      var response = yield call(service.putProjects, payload);
      displayRequestMessage(response, false, '/#/projects/list');

      yield put({
        type: ProjectReducer.Save,
        payload: { loading: false}
      })
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
