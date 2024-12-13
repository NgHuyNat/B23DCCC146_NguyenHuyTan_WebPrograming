const Ward = require('../models/Ward');

exports.getAllWards = (req, res) => {
    Ward.getAllWards((err, wards) => {
        if (err) {
            res.send(err);
        }
        console.log('Get All Wards Successful');
        res.send(wards);
    });
}

exports.getWardById = (req, res) => {
    Ward.getWardById(req.params.id, (err, ward) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Ward by id Successful');
        res.send(ward);
    });
};

exports.addWard = (req, res) => {
    const ward = req.body;
    Ward.addWard(ward, (err, ward) => {
        if (err) {
            res.send(err);
        }
        console.log('Add Ward Successful');
        res.send(ward);
    });
}

exports.updateWard = (req, res) => {
    const ward = req.body;
    Ward.updateWard(ward, (err, ward) => {
        if (err) {
            res.send(err);
        }
        console.log('Update Ward Successful');
        res.send(ward);
    });
}

exports.deleteWard = (req, res) => {
    Ward.deleteWard(req.params.id, (err, ward) => {
        if (err) {
            res.send(err);
        }
        console.log('Delete Ward Successful');
        res.send(ward);
    });
}

exports.getWardsByDistrictId = (req, res) => {
    Ward.getWardsByDistrictId(req.params.district_id, (err, wards) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Wards by District Id Successful');
        res.send(wards);
    });
}