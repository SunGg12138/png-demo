const PNG = require('./lib/png');

const myPng = new PNG();

myPng.width = 30;
myPng.height = 40;

// 设置调色板的颜色信息
myPng.paletteColors = [
    // 背景色
    'ffffff',
    // 帽子、背带裤
    'de0000',
    // 皮肤
    'ffb210',
    // 胡子、衣服、眼睛、鞋子
    '736900',
];

// 创建一个30 * 40的二维数组，默认填充 0
const pixels = Array(myPng.height).fill(0).map(() => Array(myPng.width).fill(0));

// 画帽子
pixels[0].splice(12, 7, ...Array(7).fill(1));
pixels[1].splice(10, 9, ...Array(9).fill(1));
pixels[2].splice(8, 11, ...Array(11).fill(1));
pixels[3].splice(8, 15, ...Array(15).fill(1));
pixels[4].splice(8, 16, ...Array(16).fill(1));
// 头部
pixels[5].splice(8, 12, ...Array(12).fill(2));
pixels[6].splice(7, 17, ...Array(17).fill(2));
pixels[7].splice(7, 18, ...Array(18).fill(2));
pixels[8].splice(6, 19, ...Array(19).fill(2));
pixels[9].splice(6, 18, ...Array(18).fill(2));
pixels[10].splice(6, 17, ...Array(17).fill(2));
pixels[11].splice(6, 16, ...Array(16).fill(2));
pixels[12].splice(8, 13, ...Array(13).fill(2));
pixels[13].splice(10, 9, ...Array(9).fill(2));
// 上衣
pixels[14].splice(11, 9, ...Array(9).fill(3));
pixels[15].splice(8, 14, ...Array(14).fill(3));
pixels[16].splice(7, 16, ...Array(16).fill(3));
pixels[17].splice(6, 18, ...Array(18).fill(3));
pixels[18].splice(5, 20, ...Array(20).fill(3));
pixels[19].splice(5, 20, ...Array(20).fill(3));
pixels[20].splice(5, 20, ...Array(20).fill(3));
pixels[21].splice(5, 20, ...Array(20).fill(3));
pixels[22].splice(5, 20, ...Array(20).fill(3));
pixels[23].splice(5, 20, ...Array(20).fill(3));
pixels[24].splice(5, 20, ...Array(20).fill(3));
// 手部
pixels[25].splice(5, 20, ...Array(20).fill(2));
pixels[26].splice(5, 20, ...Array(20).fill(2));
pixels[27].splice(6, 18, ...Array(18).fill(2));
pixels[28].splice(6, 18, ...Array(18).fill(2));
pixels[29].splice(6, 18, ...Array(18).fill(2));
// 背带裤
pixels[30].splice(7, 16, ...Array(16).fill(1));
pixels[31].splice(6, 18, ...Array(18).fill(1));
pixels[32].splice(6, 18, ...Array(18).fill(1));
pixels[33].splice(6, 18, ...Array(18).fill(1));
pixels[34].splice(6, 18, ...Array(18).fill(1));
// 鞋子
pixels[35].splice(7, 16, ...Array(16).fill(3));
pixels[36].splice(7, 16, ...Array(16).fill(3));
pixels[37].splice(6, 18, ...Array(18).fill(3));
pixels[38].splice(5, 20, ...Array(20).fill(3));
pixels[39].splice(5, 20, ...Array(20).fill(3));
// 头发和胡子
pixels[5].splice(8, 4, ...Array(4).fill(3));
pixels[5].splice(15, 1, ...Array(1).fill(3));
pixels[6].splice(7, 3, ...Array(3).fill(3));
pixels[6].splice(11, 1, ...Array(1).fill(3));
pixels[6].splice(15, 2, ...Array(2).fill(3));
pixels[7].splice(7, 3, ...Array(3).fill(3));
pixels[7].splice(11, 2, ...Array(2).fill(3));
pixels[7].splice(15, 2, ...Array(2).fill(3));
pixels[8].splice(6, 3, ...Array(3).fill(3));
pixels[8].splice(11, 2, ...Array(2).fill(3));
pixels[9].splice(6, 3, ...Array(3).fill(3));
pixels[9].splice(16, 8, ...Array(8).fill(3));
pixels[10].splice(6, 3, ...Array(3).fill(3));
pixels[10].splice(17, 6, ...Array(6).fill(3));
pixels[11].splice(6, 4, ...Array(4).fill(3));
pixels[11].splice(17, 5, ...Array(5).fill(3));
pixels[12].splice(8, 4, ...Array(4).fill(3));
pixels[13].splice(10, 2, ...Array(2).fill(3));
// 背带裤的背带
pixels[14].splice(12, 1, ...Array(1).fill(1));
pixels[14].splice(18, 1, ...Array(1).fill(1));
pixels[15].splice(11, 2, ...Array(2).fill(1));
pixels[15].splice(18, 2, ...Array(2).fill(1));
pixels[16].splice(11, 2, ...Array(2).fill(1));
pixels[16].splice(18, 2, ...Array(2).fill(1));
pixels[17].splice(11, 2, ...Array(2).fill(1));
pixels[17].splice(18, 2, ...Array(2).fill(1));
pixels[18].splice(11, 2, ...Array(2).fill(1));
pixels[18].splice(18, 2, ...Array(2).fill(1));
pixels[19].splice(11, 2, ...Array(2).fill(1));
pixels[19].splice(18, 2, ...Array(2).fill(1));
pixels[20].splice(10, 3, ...Array(3).fill(1));
pixels[20].splice(18, 3, ...Array(3).fill(1));
pixels[21].splice(10, 3, ...Array(3).fill(1));
pixels[21].splice(18, 3, ...Array(3).fill(1));
pixels[22].splice(10, 3, ...Array(3).fill(1));
pixels[22].splice(18, 3, ...Array(3).fill(1));
pixels[23].splice(10, 11, ...Array(11).fill(1));
pixels[24].splice(10, 11, ...Array(11).fill(1));
pixels[25].splice(10, 11, ...Array(11).fill(1));
pixels[26].splice(10, 11, ...Array(11).fill(1));
pixels[27].splice(10, 11, ...Array(11).fill(1));
pixels[28].splice(9, 13, ...Array(13).fill(1));
pixels[29].splice(8, 15, ...Array(15).fill(1));
pixels[30].splice(14, 2, ...Array(2).fill(0));
pixels[31].splice(14, 2, ...Array(2).fill(0));
pixels[32].splice(13, 4, ...Array(4).fill(0));
pixels[33].splice(12, 6, ...Array(6).fill(0));
pixels[34].splice(12, 6, ...Array(6).fill(0));
// 鞋之间的空白部分
pixels[35].splice(12, 6, ...Array(6).fill(0));
pixels[36].splice(12, 6, ...Array(6).fill(0));
pixels[37].splice(12, 6, ...Array(6).fill(0));
pixels[38].splice(12, 6, ...Array(6).fill(0));
pixels[39].splice(12, 6, ...Array(6).fill(0));

// 设置IDAT数据块内容的像素点，二维数组
myPng.pixels = pixels;

// 输出到out.png
myPng.out(__dirname + '/超级马里奥.png');
