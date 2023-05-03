/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

export const codeMessage = {
  200: 'O servidor retornou com sucesso os dados solicitados.',
  201: 'Dados novos ou modificados foram bem-sucedidos. ',
  202: 'Uma solicitação entrou na fila de segundo plano (tarefa assíncrona).',
  204: 'Dados excluídos com sucesso.',
  400: 'Ocorreu um erro na solicitação enviada e o servidor não criou ou modificou os dados.',
  401: 'O usuário não tem permissão (token, nome de usuário e senha estão errados).',
  403: 'O usuário está autorizado, mas o acesso é proibido.',
  404: 'A solicitação enviada era para um registro que não existia e o servidor não funcionou.',
  406: 'O formato solicitado não está disponível.',
  410: 'O recurso solicitado é excluído permanentemente e não estará mais disponível.',
  422: 'Ao criar um objeto, ocorreu um erro de validação.',
  500: 'Ocorreu um erro no servidor, verifique o servidor.',
  502: 'Erro de gateway.',
  503: 'O serviço não está disponível e o servidor está temporariamente sobrecarregado ou mantido.',
  504: 'O gateway atingiu o tempo limite.',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Erro de solicitação ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Sua rede está anormal e não pode se conectar ao servidor',
      message: 'Anomalia de rede',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  //credentials: 'include', // 默认请求是否带上cookie
});

export default request;
