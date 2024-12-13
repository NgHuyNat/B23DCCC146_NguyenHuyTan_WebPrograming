const District = require('../models/District');

exports.getAllDistricts = (req, res) => {
    District.getAllDistricts((err, districts) => {
        if (err) {
            res.send(err);
        }
        console.log('Get All Districts Successful');
        res.send(districts);
    });
}

exports.getDistrictById = (req, res) => {
    District.getDistrictById(req.params.id, (err, district) => {
        if (err) {
            res.send(err);
        }
        console.log('Get District by id Successful');
        res.send(district);
    });
};

exports.addDistrict = (req, res) => {
    const district = req.body;
    District.addDistrict(district, (err, district) => {
        if (err) {
            res.send(err);
        }
        console.log('Add District Successful');
        res.send(district);
    });
}

exports.updateDistrict = (req, res) => {
    const district = req.body;
    District.updateDistrict(district, (err, district) => {
        if (err) {
            res.send(err);
        }
        console.log('Update District Successful');
        res.send(district);
    });
}

exports.deleteDistrict = (req, res) => {
    District.deleteDistrict(req.params.province_id, (err, district) => {
        if (err) {
            res.send(err);
        }
        console.log('Delete District Successful');
        res.send(district)
    });
}

exports.getDistrictsByProvinceId = (req, res) => {
    District.getDistrictsByProvinceId(req.params.province_id, (err, districts) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Districts by Province Id Successful');
        res.send(districts);
    });
}
