import React, { useEffect, useState, useContext, useImperativeHandle, useReducer, useCallback } from 'react';
import { ClockContext } from './demo';

/*********************reducer*******************/
const initState = { count: 0 };

const reducer = (state, action) => {
  switch(action.type) {
    case 'add': return { count: state.count + 1 };
    case 'reset': return { count: action.payload };
    default: return state;
  }
}
/***********************************************/

const Clock = React.forwardRef((props, ref) => {
  const start  = useContext(ClockContext);
  // const [count, setCount] = useState(start);

  //==================
  const [state, dispatch] = useReducer(reducer, initState);
  const { count } = state;
  //==================

  // 外部启动参数变化时重新计数
  useEffect(() => {
    const timer = setInterval(() => {
      // setCount(prevCount => prevCount + 1)
      dispatch({ type: 'add' });
    }, 1000);
    return () => {
      if (timer) {
        // 清除定时器
        clearInterval(timer);
        
        /***************
        1. 必须在这里重置，外层只有组件初始化时会生效
        2. 依然有问题，当useEffect开始执行时，return的代码已经处于闭包中，start锁定的是上一轮的初值
        3. 所以start其实不用传下来
        ****************/
        // setCount(start);
        /****************************/

        console.log('定时器已清除');
      }
    }
  }, [start]);

  const handleReset = useCallback(value => {
    // setCount(value);
    dispatch({ type: 'reset', payload: value });
    console.log(`当前的count${count}`);
  }, []);

  useImperativeHandle(ref, () => ({
    handleReset: handleReset,
  }));

  // useState没有callback，但可以通过useEffect实现同等功能
  useEffect(() => {
    console.log(`count${count}`);
  }, [count]);

  return (
    <>
      <div>时间啊，开始流动吧</div>
      <div>{count}</div>
    </>
  );
})

export default Clock; 