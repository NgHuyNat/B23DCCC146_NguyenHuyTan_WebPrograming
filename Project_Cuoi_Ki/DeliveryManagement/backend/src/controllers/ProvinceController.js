const Province = require('../models/Province');

exports.getAllProvinces = (req, res) => {
    Province.getAllProvinces((err, provinces) => {
        if (err) {
            res.send(err);
        }
        console.log('Get All Provinces Successful');
        res.send(provinces);
    });
}

exports.getProvinceById = (req, res) => {
    Province.getProvinceById(req.params.id, (err, province) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Province by id Successful');
        res.send(province);
    });
}

exports.addProvince = (req, res) => {
    const province = req.body;
    Province.addProvince(province, (err, province) => {
        if (err) {
            res.send(err);
        }
        console.log('Add Province Successful');
        res.send(province);
    });
}

exports.updateProvince = (req, res) => {
    const province = req.body;
    Province.updateProvince(province, (err, province) => {
        if (err) {
            res.send(err);
        }
        console.log('Update Province Successful');
        res.send(province);
    });
}

exports.deleteProvince = (req, res) => {
    Province.deleteProvince(req.params.id, (err, province) => {
        if (err) {
            res.send(err);
        }
        console.log('Delete Province Successful');
        res.send(province);
    });
}

