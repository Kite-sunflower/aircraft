require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`服务器运行在端口${port}`);
    });
  } catch (error) {
    console.log('服务启动失败', error);
  }
};

startServer();
