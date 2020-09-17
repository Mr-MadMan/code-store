// 自定义promise模块
(function (window) {
  /* Promise构造函数
    excutor:执行器函数
  */
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';
  function Promise(excutor) {
    const that = this;
    that.status = PENDING;  //给promise对象指定一个status属性,初始值为pending
    that.data = undefined;  //给promise对象指定一个用于存储结果数据的属性
    that.callbacks = [];  //每个元素的结构:{onResolved(){},onRejected(){}}

    function resolve(value) {
      // 如果当前状态不是pending直接退出调用
      if (that.status !== 'pending') {
        return
      }
      //将状态改为resolved
      that.status = RESOLVED
      //保存value数据
      that.data = value
      // 如果有待执行callback函数,立即异步执行回调onResolved
      if (that.callbacks.length > 0) {
        setTimeout(() => {  //放入队列执行所有成功的回调
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }
    function reject(reason) {
      if (that.status !== 'pending') {
        return
      }
      //将状态改为rejected
      that.status = REJECTED
      //保存value数据
      that.data = reason
      // 如果有待执行callback函数,立即异步执行回调onRejected
      if (that.callbacks.length > 0) {
        setTimeout(() => {  //放入队列执行所有成功的回调
          that.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(value)
          })
        })
      }

    }
    // 立即同步执行excutor
    try {
      excutor(resolve, reject)
    } catch (error) {  //如果执行器抛出异常，promise对象变为rejected状态
      reject(error)
    }
  }

  /* promise原型对象的then()
    指定成功和失败的回调函数
    返回一个新的promise对象
  */
  Promise.prototype.then = function (onResolved, onRejected) {

    onResolved = typeof onResolved === 'function' ? onResolved : value => value   //向后传递成功的value
    // 指定默认的失败回调(实现错误/异常穿透的关键点)
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }   //向后传递失败的reason

    const that = this;
    //返回一个新的promise对象
    return new Promise((resolve, reject) => {
      /* 调用指定的回调函数处理 放外面和放里面都是同步执行的 根据执行的结果，改变return的promise状态*/
      function handle(callback) {
        /* 1.如果抛出异常，return的promise就会失败，reason就是error
           2.如果回调函数返回不是promsie，return的promise就成功，value就是返回的值
           3.如果回调函数返回是promise，return的promise结果就是这个promise结果
         */
        try {
          const result = callback(that.data)
          // 如果回调函数返回是promise，return的promise结果就是这个promise的结果
          if (result instanceof Promise) {
            // result.then(
            //   value => resolve(value),  //当result成功时，让return的promise也成功
            //   reason => reject(reason)  //当result失败时，让return的promise也失败
            // )
            result.then(resolve, reject)
          } else {
            // 如果回调函数返回不是promise，return的promise就会成功，value就是返回的值
            resolve(result)
          }
        } catch (error) {
          // 如果抛出异常，return的promise就会失败，reason就是error
          reject(error)
        }
      }
      if (that.status === PENDING) {
        // 假设当前状态还是pending状态，将回调函数保存
        that.callbacks.push({
          onResolved(value) { handle(onResolved) }, onRejected(reason) { handle(onRejected) }
        })
      } else if (that.status === RESOLVED) {
        //若当前状态是resolved，异步执行onResolved并改变return的promise状态
        setTimeout(() => {
          handle(onResolved)
        })
      } else {
        //若当前状态是rejected，异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })
  }

  /* Promise原型对象的catch()
    指定失败的回调函数
    返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {
    //捕获异常将undefined传给then()的onResolved
    return this.then(undefined, onRejected)
  }

  /* Promise函数对象的resolve方法
    返回一个指定结果的成功的promise
  */
  Promise.resolve = function (value) {
    // 返回一个成功/失败的promise
    return new Promise((resolve, reject) => {
      // value是promise
      if (value instanceof Promise) {
        // 根据value结果作为promise结果  成功的结果交给resolve  失败的结果交给reject
        value.then(resolve, reject)
      } else {
        //value 不是promise  =>promise变为成功,数据为value
        resolve(value)
      }
    })
  }
  /* Promise函数对象的reject方法
    返回一个指定结果的失败的promise
  */
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /* Promise函数对象all方法
    返回一个promise,只有当所有promise都成功时才成功,否则只要有一个失败就失败
  */
  Promise.all = function (promises) {
    //用来保存所有成功value的数组
    const valueArr = new Array(promises.length)
    // 用来宝盾成功promise的数量
    let resolvedCount = 0;
    // 返回一个新的promise
    return new Promise((resolve, reject) => {
      // 遍历promise获取每个promise结果
      promises.forEach((p, index) => {
        // 这里对p的封装是为了检验传入数组是否是其他数据类型
        Promise.resolve(p).then(
          value => {
            resolvedCount++;  //成功数量加一
            // 将成功的value保存values
            valueArr[index] = value
            // 如果全部成功,将return的promise改为成功
            if (resolvedCount === promises.length) {
              resolve(values)
            }
          },
          reason => {  //只要有一个失败,return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }
  /* Promise函数对象的race方法
    返回一个promise，其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      // 遍历promise获取每个promise结果
      promises.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            //一旦成功，将return变为成功
            resolve(value)
          },
          reason => {
            //只要有一个失败,return的promise就失败
            reject(reason)
          }
        )
      })
    })
  }

})(window)