const mongoose = require('mongoose');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

//仅开发环境加载本地配置，线上环境变量在railway中设置环境变量
if (env === 'development') {
  dotenv.config({ path: '.env.dev' });
}

dotenv.config({
  path: env === 'production' ? '.env.prod' : '.env.dev',
});

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB 连接成功:${connect.connection.host}`);
  } catch (error) {
    console.log('MongoDB 连接失败', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
