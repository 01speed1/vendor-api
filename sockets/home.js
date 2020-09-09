const { io } = require('../index')

io.on('connection', (client) => {

  client.emit('list orders', {
      usuario: 'Administrador',
      mensaje: 'Bienvenido a esta aplicación',
      otro: 'Hi',
      skatin : 'puto'
  }, () => {} );

client.on('send message', (msg) => {
  console.log(msg)
})

  client.on('disconnect', () => {
      // console.log('Usuario desconectado');
  });

  // Escuchar el cliente
  client.on('enviarMensaje', (data, callback) => {

      // console.log(data);

      client.broadcast.emit('enviarMensaje', data);

  });

});