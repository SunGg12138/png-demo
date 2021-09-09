const fs = require('fs');
const stream = require('stream');
const { crc32 } = require('crc');
const { deflate } = require('zlib');
const { promisify } = require('util');
const deflateAsync = promisify(deflate);

// 定义一些常量
const PNG_CONST = {
    // png标志头
    HEAD: Buffer.from('89504e470d0a1a0a', 'hex'),

    // IHDR标识，文件头数据块
    IHDR: Buffer.from('IHDR'),

    // PLTE标识，调色板
    PLTE: Buffer.from('PLTE'),

    // IDAT标识，图像数据块
    IDAT: Buffer.from('IDAT'),

    // 文件结束标识
    END: Buffer.from('0000000049454e44ae426082', 'hex'),
};

// 定义PNG类并继承可读流
class PNG extends stream.Readable {
	
	constructor (option) {
  	super(option);
    
    // 定义属性此可读流属性
    
    // 宽度
    this.width = 10;
    // 高度
    this.height = 10;
    // 图像深度
    this.bitDepth = 4;
    // 颜色类型
    this.colorType = 3;
    // 压缩方法，LZ77派生算法
    this.compressionMethod = 0;
    // 滤波器方法
    this.filterMethod = 0;
    // 隔行扫描方法，0：非隔行扫描 1：隔行扫描
    this.interlaceMethod = 0;
    // 调色板颜色集合
    this.paletteColors = [];
    // IDAT数据块内容的像素点，二维数组
    this.pixels = [];
  }
  
  // 继承可读流后，必须要实现_read方法，就算是不用也得写个空方法
  _read (n) {
  	// n 表示现在缓冲区可以容纳的数据量
  }
  
  // 定义crc校验方法
  cpmputeCRC (bufs) {
    return crc32(Buffer.concat(bufs));
  }
  
  // 定义zip方法
  zip (buf) {
  	return deflateAsync(buf);
  }
	
  // 定义输出方法，输出到指定文件
  async out (path) {
    
    // 调用out方法后，把this流入可写文件
    const writeAble = fs.createWriteStream(path);
    this.pipe(writeAble);
		
    // 在这里，开始定义写入文件内容
    // 使用this.push，写入到可写流
    
    // 写入文件标识头
    this.push(PNG_CONST.HEAD);
    // 写入IHDR数据块
    await this.writeIHDR();
    // 写入PLTE数据块
    await this.writePLTE();
    // 写入IDAT数据块
    await this.writeIDAT();
    // 写入结束数据块
    this.push(PNG_CONST.END);
  }

  async writeIHDR () {
    // 4字节
    const widthHex = this.width.toString(16).padStart(8, '0');
    const widthBuffer = Buffer.from(widthHex, 'hex');
    // 4字节
    const heightHex = this.height.toString(16).padStart(8, '0');
    const heightBuffer = Buffer.from(heightHex, 'hex');
    // 1字节
    const bitDepthHex = this.bitDepth.toString(16).padStart(2, '0');
    const bitDepthBuffer = Buffer.from(bitDepthHex, 'hex');
    // 1字节
    const colorTypeHex = this.colorType.toString(16).padStart(2, '0');
    const colorTypeBuffer = Buffer.from(colorTypeHex, 'hex');
    // 1字节
    const compressionMethodHex = this.compressionMethod.toString(16).padStart(2, '0');
    const compressionMethodBuffer = Buffer.from(compressionMethodHex, 'hex');
    // 1字节
    const filterMethodHex = this.filterMethod.toString(16).padStart(2, '0');
    const filterMethodBuffer = Buffer.from(filterMethodHex, 'hex');
    // 1字节
    const interlaceMethodHex = this.interlaceMethod.toString(16).padStart(2, '0');
    const interlaceMethodBuffer = Buffer.from(interlaceMethodHex, 'hex');
    // 长度4字节
    const totalLengthHex = (13).toString(16).padStart(8, '0');

    this.push(Buffer.from(totalLengthHex, 'hex'));
    this.push(PNG_CONST.IHDR);
    this.push(widthBuffer);
    this.push(heightBuffer);
    this.push(bitDepthBuffer);
    this.push(colorTypeBuffer);
    this.push(compressionMethodBuffer);
    this.push(filterMethodBuffer);
    this.push(interlaceMethodBuffer);

    const crc = this.cpmputeCRC([
        PNG_CONST.IHDR, widthBuffer, heightBuffer, bitDepthBuffer,
        colorTypeBuffer, compressionMethodBuffer, filterMethodBuffer, interlaceMethodBuffer
    ]);

    this.push(Buffer.from((crc).toString(16), 'hex'));
  }

  async writePLTE () {
    const contentHex = this.paletteColors.join('');
    const contentBuffer = Buffer.from(contentHex, 'hex');
    // 4字节
    const totalLengthHex = contentBuffer.byteLength.toString(16).padStart(8, '0');

    this.push(Buffer.from(totalLengthHex, 'hex'));
    this.push(PNG_CONST.PLTE);
    this.push(contentBuffer);

    const crc = this.cpmputeCRC([
        PNG_CONST.PLTE, contentBuffer
    ]);

    this.push(Buffer.from((crc).toString(16), 'hex'));
  }

  async writeIDAT () {

    let rawContentBuffer;

    // 索引彩色图像
    if (this.colorType === 3) {
      // 获取索引彩色图像IDAT数据块内容
      rawContentBuffer = this.getIDAT3Content();
    } else {
      throw new Error('仅支持索引彩色图像');
    }

    // 压缩
    const contentBuffer = await this.zip(rawContentBuffer);

    // 4字节
    const totalLengthHex = contentBuffer.byteLength.toString(16).padStart(8, '0');

    this.push(Buffer.from(totalLengthHex, 'hex'));
    this.push(PNG_CONST.IDAT);
    this.push(contentBuffer);

    const crc = this.cpmputeCRC([
      PNG_CONST.IDAT, contentBuffer
    ]);

    this.push(Buffer.from((crc).toString(16), 'hex'));
  }
  
  // 获取索引彩色图像IDAT数据块内容
  getIDAT3Content () {
  
  	const contentRowBuffers = [];

    for (let row of this.pixels) {
      // 每行以0开头，占一个字节
      contentRowBuffers.push(Buffer.from('00', 'hex'));
			
      // 转成占4个bit的二进制的值
      const bitsStr = [];
      row.forEach(item => {
        bitsStr.push(item.toString(2).padStart(4, '0'));
      });

      const rowHex = [];
      
      // 因为一个索引值占4个bit，所以两个索引值合成一个字节
      for (let i = 0; i < bitsStr.length; i += 2) {
        const hex = parseInt(bitsStr[i] + (bitsStr[i + 1] || '0000'), 2).toString(16).padStart(2, '0');
        rowHex.push(hex);
      }

      contentRowBuffers.push(Buffer.from(rowHex.join(''), 'hex'));
    }

    return Buffer.concat(contentRowBuffers);
  }
}

module.exports = PNG;