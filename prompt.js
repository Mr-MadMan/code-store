import Vue from 'vue';
import { Message, Loading, MessageBox } from 'element-ui';

export function showToast(params) {
  const options = {
    title: '',
    icon: 'none',
    mask: true,
    duration: 3000,
  };
  if (typeof params === 'string') {
    Object.assign(options, { title: params });
  } else {
    Object.assign(options, params);
  }
  Message({
    message: options.title,
    duration: options.duration,
  });
  return new Promise(resolve => setTimeout(resolve, options.duration));
}

export function showLoading(params) {
  const options = {
    title: '',
    mask: true,
  };
  if (typeof params === 'string') {
    Object.assign(options, { title: params });
  } else {
    Object.assign(options, params);
  }
  return Loading.service({ text: options.title });
}

export function autoLoadingDecorator(target, name, descriptor) {
  const func = descriptor.value;
  descriptor.value = function () {
    return autoLoading(func.apply(this, arguments));
  };
}

export function autoLoading(target, options) {
  const loadingInstance = showLoading(options || '加载中');
  const action = Promise.resolve(target instanceof Function ? target() : target);
  return action
    .finally(() => {
      loadingInstance.close();
    })
    .catch(err => {
      errHandle(err);
    });
}

export function errToast(target, name, descriptor) {
  const func = descriptor.value;
  descriptor.value = function () {
    return func.apply(this, arguments).catch(err => {
      errHandle(err);
    });
  };
}

export function errHandle(err) {
  const ignoreErrors = /(cancel|ignore|请先登录)/i;
  const msg = err.message || err.errMsg;
  if (!ignoreErrors.test(msg)) {
    msg && MessageBox({
      title: '请求提示',
      message: msg,
      type: 'error',
    });
  }
  throw err;
}

export function alertMsg(params, isShowClose = false, isShowCancelButton = false) {
  const options = {
    title: '',
    message: params,
    type: 'info',
    showCancelButton: isShowCancelButton,
    showClose: isShowClose,
  };
  typeof params === 'string' ? Object.assign(options, { message: params }) : Object.assign(options, { message: '' });
  MessageBox(options);
}

Vue.prototype.$showToast = showToast;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$autoLoading = autoLoading;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = alertMsg;
Vue.autoLoading = autoLoadingDecorator;
Vue.errToast = errToast;
