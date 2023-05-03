import { notification } from "antd";

export const displayRequestMessage = (result: any, reload: boolean = false, path: string = '') => {
  if (!result) return;

  var data = result.data;
  var response = result.response;

  switch (response.status) {
    case 200:
      data.messages.map((m: string) => {
        notification.success({
          message: m
        });
      })
      break;
    case 400:
      data.messages.map((m: string) => {
        notification.error({
          message: m
        });
      })
      break;
    case 204:
      data.messages.map((m: string) => {
        notification.warning({
          message: m
        });
      })
      break;
    default:
      break
  }

  if (reload) window.location.reload();
  if (path) window.location.replace(path);

  return;
}

const errand = {
  displayRequestMessage,
}

export default errand
