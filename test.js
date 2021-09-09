const PNG = require('./lib/png');

const myPng = new PNG();

myPng.width = 8;
myPng.height = 8;

// 设置调色板的颜色信息，设置了13个颜色
myPng.paletteColors = [
    'ffff00', 'ffed00', 'ffc300',
    'ff9900', 'ff6600', 'ff3b00',
    'ff0f00', 'e20015', 'b70034',
    '8b0054', '600073', '330099',
    '0900b2',
];

// 设置IDAT数据块内容的像素点，二维数组
myPng.pixels = [
    [ 12, 11, 10, 9, 8, 7, 6, 5 ],
    [ 11, 10, 9, 8, 7, 6, 5, 4 ],
    [ 10, 9, 8, 7, 6, 5, 4, 3 ],
    [ 9, 8, 7, 6, 5, 4, 3, 2 ],
    [ 8, 7, 6, 5, 4, 3, 2, 1 ],
    [ 7, 6, 5, 4, 3, 2, 1, 0 ],
    [ 6, 5, 4, 3, 2, 1, 0, 0 ],
    [ 5, 4, 3, 2, 1, 0, 0, 0 ],
];

// 输出到out.png
myPng.out(__dirname + '/out.png');
