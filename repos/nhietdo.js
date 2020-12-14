var db = require('../utils/db');
exports.loadAll = () => {
    var sql = 'select * from nhiet_do';
    return db.load(sql);
}
exports.loadNhietDoTrongNgay = (date) => {
    var sql = `select * from nhiet_do where thoi_gian like '${date}'`;

    return db.load(sql);
}
exports.loadNhietDoTrongTuan = (date) => {
    var sql = `select * from nhiet_do where thoi_gian like '${date}'`;

    return db.load(sql);
}
exports.add = (data) => {
    var sql = `insert into nhiet_do(nhiet_do,thoi_gian) values ('${data.nhiet_do}','${data.thoi_gian}')`;
    return db.load(sql);
}
