
/* 
  冒泡排序 
  平均时间复杂度O(n^2)  最好O(n)  最坏O(n^2)  稳定
*/

function bubbleSort(arr) {
  let temp;
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr
}
// console.log(bubbleSort([22, 11, 2, 3, 1, 12, 5, 6]));
/*
  选择排序
  平均时间复杂度O(n^2)  最好O(n^2)  最坏O(n^2)  不稳定
*/
function selectSort(arr) {
  // 找最小下标 
  let minIndex, temp
  for (let i = 0; i < arr.length; i++) {
    // 将当前值先记为最小值
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        // 找到最小数的下标暂存
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}


/* 
  插入排序 抽卡排序
  平均时间复杂度O(n^2)  最好O(n)  最坏O(n^2)  稳定
 */
function insertSort(arr) {
  // 记录当前值，和前一个值的索引值
  let current, preIndex
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      // 如果上一个值大于当前值 两者替换
      arr[preIndex + 1] = arr[preIndex]
      // 索引值减小接着和前面的值比较
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}

/* 
  希尔排序
  平均时间复杂度O(nlogn)  最好O(nlog^2n)  最坏O(nlog^2n)  不稳定

*/
function shellSort(arr) {
  var len = arr.length,
    temp,
    gap = 1;
  while (gap < len / 3) {          //动态定义间隔序列
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }
  return arr;
}

/* 
  归并排序
  平均复杂度O(nlogn)  最好O(nlogn)  最坏O(nlogn)  空间复杂度O(n) 稳定
*/
function mergeSort(arr) {
  if (arr.length < 2) return arr;
  // 每次将数组折半处理
  let middle = Math.floor(arr.length / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle, arr.length)
  // 递归将原数组拆分后进行比较最后再归并到一起
  return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
  let res = []
  // 将左右数组中的头元素取出进行比较
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift())
    } else {
      res.push(right.shift())
    }
  }

  // 将排序好的归并
  while (left.length) {
    res.push(left.shift())
  }
  while (right.length) {
    res.push(right.shift())
  }

  return res
}
// console.log(mergeSort([21, 31, 11, 2, 55, 1, 5, 6, 4, 10]));


/*
  快速排序
  平均复杂度O(nlogn)  最好O(nlogn)  最坏O(n^2)  O(nlogn) 不稳定
  选定pivot中心轴
  将大于pivot的数字放在pivot右边，小于pivot的数字放在左边
  分别对左右子序列重复前三步
*/
function quick_sort(arr, from, to) {
  var i = from; //哨兵i
  var j = to; //哨兵j
  var key = arr[from]; //标准值
  if (from >= to) { //如果数组只有一个元素
    return;
  }
  while (i < j) {
    while (arr[j] > key && i < j) { //从右边向左找第一个比key小的数，找到或者两个哨兵相碰，跳出循环
      j--;
    }
    //从左边向右找第一个比key大的数，找到或者两个哨兵相碰，跳出循环,这里的=号保证在本轮循环结束前，key的位置不变，否则的话跳出循环，交换i和from的位置的时候，from位置的上元素有可能不是key
    while (arr[i] <= key && i < j) {
      i++;
    }
    /**代码执行到这里，1、两个哨兵到找到了目标值。2、j哨兵找到了目标值。3、两个哨兵都没找到(key是当前数组最小值) **/
    if (i < j) { //交换两个元素的位置
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  // 将标准值与当前头指针指向的值对换  
  arr[from] = arr[i]
  arr[i] = key;
  // 将当前数组拆分递归调用  同时拆分指针
  quick_sort(arr, from, i - 1);  //遍历左子序列
  quick_sort(arr, i + 1, to);  //遍历右子序列
  return arr
}
console.log(quick_sort([21, 31, 11, 2, 55, 1, 5, 6, 4, 10], 0, [21, 31, 11, 2, 55, 1, 5, 6, 4, 10].length - 1));


/*
  爬楼梯 一次能爬一个台阶或两个台阶
  动态规划问题 第n级台阶会从n-1或从第n-2级台阶爬两级  递推公式Fn = Fn-1 + Fn-2
*/

// function climbStep(n) {
//   if (n == 1) return 1;
//   if (n == 2) return 2;
//   let ret = 0,
//     pre = 2,
//     prepre = 1;
//   滚动数组  优化空间复杂度，为O(1)
//   for (let i = 3; i <= n; i++) {
//     ret = pre + prepre; //当前楼梯数方法总是前两个楼梯数方法之和
//     prepre = pre;
//     pre = ret;
//   }
//   return ret;
// }

// 爬楼梯
function climbStep(number) {
  // 不考虑第0步情况
  var arr = [1, 2]
  for (var i = 2; i < number; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[number - 1]
}

// Fibonacci数列  时间复杂度O(n)
function Fibonacci(n) {
  // write code here
  var fib_n = function (curr, next, n) {
    if (n == 0) {
      return curr;
    }
    else {
      return fib_n(next, curr + next, n - 1);
    }
  }
  return fib_n(0, 1, n);
}


// 找出数组中重复次数最多的数
var arr = [2, 42, 2, 1, 1, 1, 23, 12, 13, 2, 5]
function deRepeat(arr) {
  let obj = {}, maxNum = 0, maxVal;
  arr.forEach(element => {
    if (obj[element]) {
      obj[element]++
    } else {
      obj[element] = 1
    }
  });
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] > maxNum) {
        maxNum = obj[key]
        maxVal = key
      }
    }
  }

  return `出现最多次数的数是：${maxVal}出现次数为${maxNum}`
}


function quchong(str) {
  return Array.from(new Set(str))
}


// function fomartNum(num) {
//   let numarr = num.toString().split(''), temp = [], res;
//   for (let i = numarr.length - 1; i >= 0; i--) {
//     if (numarr[i] !== '0') {
//       temp = numarr.slice(0, i + 1)
//       break;
//     }
//   }
//   temp = temp.reverse()
//   res = temp.join('')
//   res = parseInt(res).toString(5)
//   return res
// }

new Promise((resolve, reject) => {
  reject()
}).then(() => { console.log('success') }, () => { console.log('fail') }).catch(() => { console.log('catch') })


const p1 = new Promise((resolve) => resolve('aa'))
const p2 = new Promise((resolve) => resolve('bb'))
const p3 = new Promise((resolve, reject) => reject('cc'))

Promise.race([p1, p2, p3]).then((res) => console.log(res)).catch(() => { console.log('sth. wrong!') })

/* 合并有序数组 */
/* 思路： */
var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m)
  nums2.splice(n, nums2.length - n)
  Object.assign(nums1, [...nums1, ...nums2].sort((a, b) => a - b))
  return nums1
};
console.log(merge([1, 2, 3, 0, 0], 4, [2, 5, 6], 2));

var newarr = []
for (var i = 0; i < 3; i++) {
  newarr.push(() => i)
}
newarr = newarr.map(el => el())
console.log(newarr);


// 寻找对称字符串
function judgeStr(str) {
  let arr = str.split('')
  arr = Array.from(new Set(arr))
  str = arr.join('')
  let count = 0, num1, num2
  for (let i = 0; i < str.length; i++) {
    num1 = str[i].charCodeAt()
    for (let j = i + 1; j < str.length - i; j++) {
      num2 = str[j].charCodeAt()
      if (num1 + num2 === 219) {
        ++count
      }
    }
  }
  return count
}
console.log(judgeStr('aabqzyw'));

// 二叉树
var root = {
  id: 1,
  left: {
    id: 2,
    left: {
      id: 4,
    },
    right: {
      id: 5
    }
  },
  right: {
    id: 3,
    left: {
      id: 6
    },
    right: {
      id: 7
    }
  }
}

var nodeSequence = []
// 递归法先序遍历
function DLR(root) {
  if (root != null) {
    nodeSequence.push(root.id)
    if (root.left) {
      DLR(root.left)
    }
    if (root.right) {
      DLR(root.right)
    }
  }
  return nodeSequence
}
// 递归法中序遍历
function LDR(root) {
  if (root != null) {
    if (root.left) {
      LDR(root.left)
    }
    nodeSequence.push(root.id)
    if (root.right) {
      LDR(root.right)
    }
  }
  return nodeSequence
}
// 递归法后序遍历
function LRD(root) {
  if (root != null) {
    if (root.left) {
      LRD(root.left)
    }
    if (root.right) {
      LRD(root.right)
    }
    nodeSequence.push(root.id)
  }
  return nodeSequence
}

// 对象扁平化
var preObj = { a: { b: { c: 1 } }, d: 2, e: [3, { f: 4, g: [5] }, [6, 7]], h: 8 }
function flattenObj(obj, key = "", res = {}, isArray = false) {
  for (let [k, v] of Object.entries(obj)) {
    // k为当前遍历到的键名,v为对应的键值
    if (Array.isArray(v)) {
      let tmp = isArray ? key + "[" + k + "]" : key + k
      flattenObj(v, tmp, res, true)
    } else if (typeof v === "object") {
      let tmp = isArray ? key + "[" + k + "]." : key + k + "."
      flattenObj(v, tmp, res)
    } else {
      let tmp = isArray ? key + "[" + k + "]" : key + k
      res[tmp] = v
    }
  }
  return res
}
console.log(flattenObj(preObj));

// 数组扁平化  多维数组=>一维数组
// 1、reduce
// let flattenArr = function flatten(arr) {
//   return arr.reduce((result, item) => {
//     return result.concat(Array.isArray(item) ? flatten(item) : item);
//   }, []);
// }

// 2、 toString & split
// let flattenArr = function flatten(arr) {
//   return arr.toString().split(',').map(function (item) {
//     return Number(item);
//   })
// }

// 3、join & split
// let flattenArr = function flatten(arr) {
//   return arr.join(',').split(',').map(function (item) {
//     return parseInt(item);
//   })
// }
// 4、递归
let flattenArr = function flatten(arr) {
  let res = []
  arr.map(item => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item)
    }
  })
  return res
}
// 5、ES10 flat函数
// const values = [1, 2, [3, 4]].flat();
// console.log(values); // [1, 2, 3, 4]
// const valuesDeep = [1, [2, [3]]];
// console.log(valuesDeep.flat(Infinity));

// console.log(flattenArr([1, [2, 3, [4, 5]]])); 


// 链表反转
var reverseList = function (head) {
  if (head === null) return;
  // 首先用一个变量next缓存原指针的下一个节点
  let prev = null, curr = head, next = head;
  while (curr != null) {
    // next = curr.next
    // curr.next = prev
    // prev = curr
    // curr = next
    // 结构赋值法
    [curr.next, prev, curr] = [prev, curr, curr.next]
  }
  return prev
}

/* 链表反转II
  1、反转m至n之间的链表
  2、将反转后的链表与原链表拼接
*/
var reverseList2 = function (head, m, n) {
  if (head === null) return;
  let prev = null, curr = head
  // 先将curr指针移动到m这个位置
  for (let i = 1; i < m; i++) {
    prev = curr;
    curr = curr.next
  }
  // 缓存curr 和 prev起始位 为了最后拼接链表指向正确
  let prev2 = prev, curr2 = curr
  for (let i = m; i <= n; i++) {
    [curr.next, prev, curr] = [prev, curr, curr.next]
  }
  // 不等于空说明是从中间开始截取 m>1
  if (prev2 !== null) {
    prev2.next = prev
  } else {
    // 头部设为反转后链表的头部
    head = prev
  }
  curr2.next = curr
  return head
}


/* 循环矩阵
  [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
  1、定义四个边界以及当前方向
  2、当左边界小于等于右边界，且上边界小于等于下边界时(<=是为了不漏最后一层遍历元素)，执行while循环
  3、按照右、下、左、上的顺序，依次将路径上的字符添加到返回结果里
  4、while循环结束，返回结果
*/
function martixArr(arr) {
  if (arr.length === 0) return [];
  // 定义边界
  let top = 0
  let bottom = arr.length - 1
  let left = 0
  let right = arr[0].length - 1

  let direction = 'right'
  let res = []

  while (left <= right && top <= bottom) {
    if (direction === 'right') {
      for (let i = left; i <= right; i++) {
        // 加入当前向右遍历的数组元素
        res.push(arr[top][i])
      }
      // 完成top层遍历后，top++，方向改变
      top++
      direction = 'down'
    } else if (direction === 'down') {
      for (let i = top; i <= bottom; i++) {
        // 行变列不变
        res.push(arr[i][right])
      }
      right--
      direction = 'left'
    } else if (direction === 'left') {
      for (let i = right; i >= left; i--) {
        res.push(arr[bottom][i])
      }
      bottom--
      direction = 'top'
    } else if (direction === 'top') {
      for (let i = bottom; i >= top; i--) {
        res.push(arr[i][left])
      }
      left++
      direction = 'right'
    }
  }
  return res
}
console.log(martixArr([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]));
