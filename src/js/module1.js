;(function ($, window) {
  function A () {
    console.log('js from module1')
  } 

  A.prototype = {
    //方法
  }

  new A();

  //如果需要暴露给全局
  //window.A = A;


  //测试ES5语法
  var a = [1,2,3,4,5]
  console.log(a)
  a.forEach(function(v,i) {
    console.log(v)
  })
  
  setTimeout(()=>{
    console.log('测试箭头函数')
  },200)


})(jQuery, window);
