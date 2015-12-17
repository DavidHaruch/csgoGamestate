var socket = io("http://localhost:6378");
  socket.on('update', function (data) {
    console.log(JSON.parse(data));
    document.querySelector("#data").textContent = JSON.parse(data).currentWeapon;
    socket.emit('my other event', { my: 'data' });
  });