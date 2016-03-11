var static = require('node-static');
var http = require('http');
var file = new(static.Server)();

var app = http.createServer(function (req, res){
	file.serve(req,res);
}).listen(3000);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket){
	console.log('connection', 'connection is start');
	
	//加入相应的room中
	socket.on('join_board', function(board_id){
		console.log('join board room Id is :'+ board_id);
		socket.join(board_id);
	});
	
	//清空界面
	socket.on('clear_page',function(data){
		io.sockets.in(data.room).emit('clear_page',data);
	});
	
	//将用户的绘画数据发送给房间中的其他人
	socket.on('draw', function(data){
		console.log('received draw data from room ' + data.room);
		io.sockets.in(data.room).emit('draw',data);
	});
	
	socket.on('disconnect', function(data){
		console.log('have user leave the room');
		socket.leave(data.room);
	});
});