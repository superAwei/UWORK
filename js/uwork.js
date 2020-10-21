// 完整程式碼
// 先抓取要監聽的物件
document.getElementById('idcalcstar').onclick = function(e){
  e.preventDefault();//取消按鈕預設會跳轉的屬性
  var salary = parseInt(document.getElementById('idsalary').value);
  var hourly = parseInt(document.getElementById('idhourly').value);
  var oil = parseInt(document.getElementById('idoil').value);
  var fee = parseInt(document.getElementById('idfee').value);
  var service = parseInt(document.getElementById('idservice').value);
  var other = parseInt(document.getElementById('idother').value);
  var depreciation = parseInt(document.getElementById('iddepreciation').value);
  //把上面抓到的值去計算總時數存到 hr 內
  var hr = parseInt((salary+oil+fee+service+other+depreciation)/hourly);
  //把 hr 算出來的總時間塞進 workhour 區域內
  document.getElementById('workhour').textContent = hr;

  //把上面算出來的結果存在 localStorage
 var save = document.getElementById('idsave'); //儲存按鈕
 var list = document.getElementById('list');   //要把紀錄放到列表內
 var data =JSON.parse(localStorage.getItem('listData')) || []; //存放 localStorage 的資料

 //監聽與更新
 save.addEventListener('click',addData);//執行儲存函式
 list.addEventListener('click',togglelist);//執行刪除函式
 updateList(data);//更新目前最新的紀錄列表

 //儲存記錄到 localStorage
 function addData(e){
     e.preventDefault();
     var txt = hr; //文字就是上面算出來的 hr 變數值
     var hourlist = {
       content:txt //把 txt 放進一個物件內
     };
     data.push(hourlist);//在最上面的 data 變數放進 hourlist 物件資料
     updateList(data);//更新目前最新的紀錄列表
     localStorage.setItem('listData',JSON.stringify(data));//將資料儲存在 localStorage 內，並用 stringify轉成字串格式。
     updateList(data); //更新目前最新的紀錄列表
 }
 //更新紀錄列表內容
 function updateList(items){
   str = ''; //設定一個空字串
   var len = items.length; //抓資料的所有內容
   for(var i=0;i<len;i++){
      // str += '<li><a href="#" data-index='+i+'>刪除</a><span>'+items[i].content+'</span></li>'; //把 HTML 標籤組合起來
      str += '<li><span>'+items[i].content+'</span><a href="#"  data-index='+i+'><i class="far fa-trash-alt"></i></a></li>'; //把 HTML 標籤組合起來
   }
   list.innerHTML = str; //把上面組合好的HTML， 放進 list 列表內
 }
 //刪除列表的函式
 function togglelist(e){
   e.preventDefault();
   if(e.target.tagName !== 'A'){return}; //點擊的如果不是A標籤就返回，Ａ是在 windown 內<a>的名稱
   var index =e.target.dataset.index; //取得點擊元素的 index 位置
   data.splice(index,1);//從點擊處刪除一筆資料
   localStorage.setItem('listData', JSON.stringify(data)); //再把刪除後的資料存到 localStorage
   updateList(data);//更新目前最新的紀錄列表
 }

 //數字會慢慢跳動的動畫函式
 function countup() {
  var options = {
    useEasing: true,
    useGrouping: true,
    separator: '',
    decimal: ',',
    suffix: 'hr',//單位
  };
  if(document.getElementById('workhour').textContent == '') { return }
  var demo = new CountUp('workhour', 0, document.getElementById('workhour').textContent, 0, 2.5, options);
  if (!demo.error) {
  demo.start();
  } else {
    console.error(demo.error);
  }
}
countup(); 
}
