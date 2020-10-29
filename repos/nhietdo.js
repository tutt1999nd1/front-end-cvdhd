var db = require('../utils/db');
exports.loadAll = () => {
    var sql = 'select * from nhiet_do';
    return db.load(sql);
}
exports.add = (data) => {
    var sql = `insert into nhiet_do(nhiet_do,thoi_gian) values ('${data.nhiet_do}','${data.thoi_gian}')`;
    return db.load(sql);
}
