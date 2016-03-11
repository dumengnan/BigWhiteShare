var socket = io('http://192.168.1.17:3000/');
var board_id ,name,path,tool,canvas,socket_id;

$( document ).ready(function(){
  adjust_screen();
	init();
});

function init(){
    console.log("init");
	canvas = document.getElementById("myCanvas");
    paper.setup(canvas);
    tool = new paper.Tool();
    var params = getSearchParameters();
    board_id = params.board_id;

    join_board();

tool.onMouseDown = function(event) {
     path = new paper.Path();
     path.strokeColor = "#000000";
     path.strokeWidth  = 1;
}

tool.onMouseDrag = function(event) {
     path.add(event.point);
    
}
tool.onMouseUp = function(event) {
  socket.emit('draw', {
                            tool: 'pencilTool',
                            path: path.exportJSON(),
                            color: "#000000",
                            penSize: 3,
                            activity: 'up',
                            room:board_id,
                            sender_id:socket_id
                        });
}

$("#tools_icon").click(function(){
  $("#tools_bar").toggle( "slow" );
});

$("#myCanvas").click(function(){
  $("#tools_bar").fadeOut(500);
});

$(".clear_screen").click(function(){
  socket.emit('clear_page', {room:board_id});
  paper.project.clear();
  paper.view.draw();
  console.log('click the clear function ');
});
}

function getSearchParameters() {
      var prmstr = window.location.search.substr(1);
      return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
    var params = {};
    var prmarr = prmstr.split("&");
    for ( var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

/************UI Adjustment*****/

function adjust_screen(){
  var screen_height = $(window).height();
  var screen_width = $(window).width();
  $("#myCanvas").height((screen_height-5));
  $("#myCanvas").width((screen_width-5));
  $("#tools_bar").height((screen_height-14));

}

/********Socket******/

function join_board(){
    socket.emit('join_board', board_id);
    console.log('join_board is finished');

}
socket.on('connected_to_board', function(data) {
                        localStorage.board_id = data.board_id;
                        localStorage.user = JSON.stringify(data.user);
                        socket_id=data.user.socket_id;
                        //defer.resolve(data);
                       console.log("connected_to_board");
});
socket.on('draw',function(data){
	remotePath = new paper.Path();
                            remotePath.importJSON(data.path);
                            paper.view.draw();
    console.log('received the draw information');
});

//将界面清空
socket.on('clear_page',function(data){
      paper.project.clear();
      paper.view.draw();
});

/***drawing**/
