import request from '@/utils/request';
import { notification } from 'antd';
import { IProject } from './data';
import api from '../../../apiUrls';
import locales from '@/locales/pt-BR'

// export async function addSeller(params: Seller) {
//   let response;
//   try {
//     await request(`${api.url.seller.post}`, {
//       method: 'POST',
//       data: JSON.stringify(params),
//     }).then(async function (result) {

//       if(!result.ReturnId || !result.Message){
//         message.error("Retorno incorreto da procedure")
//         return undefined
//       }
//       //TODO fazer a chamada da outra function aqui ( function de usuário)
//       response = result;
//     });
//   }catch (error){
//     message.error("Não foi possível completar esta ação!");
//   }
//   return response;
// }

export async function postProjects(payload: IProject) {
  let response;
  try {
    await request(`${api.url.project.post}`, {
      method: 'POST',
      getResponse: true,
      charset: 'utf8',
      data: JSON.stringify(payload),
    }).then(function (result) {
      if (!result)
        throw locales["service.contactAdm"]

      response = result;
    });
  } catch (error) {
    notification.error({
      message: locales["service.messageThrow"],
      description: error,
    });
  }
  return response;
}

export async function getProjects(filters: any) {
  let paramsStr = ""
  const paramsCount = Object.keys(filters).filter(name => filters[name]).length

  if (paramsCount > 0) {
    const paramsKeys = Object.keys(filters).filter(filter => filters[filter])
    const params = paramsKeys.map(key => `${key}=${filters[key]}`)
    paramsStr = '?' + params.join('&')
  }

  let response;
  try {
    await request(`${api.url.project.get}${paramsStr}`, {
      method: 'GET',
      charset: 'utf8',
    }).then(function (result) {
      if (!result)
        result = []; //TODO: ATUALIZAR PARA ESTRUTURA DE RETORNO DO GET REAL

      response = result;
    });
  } catch (error) {
    notification.error({
      message: locales["service.messageThrow"],
      description: error,
    });
  }
  return response;
}

export async function putProjects(payload: IProject) {
  let response;
  try {
    await request(`${api.url.project.put}?id=${payload.object_key}`, {
      method: 'PUT',
      getResponse: true,
      charset: 'utf8',
      data: JSON.stringify(payload),
    }).then(function (result) {
      if (!result)
        throw locales["service.contactAdm"]

      response = result;
    });
  } catch (error) {
    notification.error({
      message: locales["service.messageThrow"],
      description: error,
    });
  }
  return response;
}

const service = {
  postProjects,
  getProjects,
  putProjects
};

export default service;
