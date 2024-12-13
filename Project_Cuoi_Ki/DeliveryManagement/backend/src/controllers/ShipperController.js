const Shipper = require('../models/Shipper');

exports.getAllShippers = (req, res) => {
    Shipper.getAllShippers((err, shippers) => {
        if (err) {
            res.send(err);
        }
        console.log('Get All Shipper Successful');
        res.send(shippers);
    });
}; 

exports.getShipperById = (req, res) => {
    Shipper.getShipperById(req.params.id, (err, shipper) => {
        if (err) {
            res.send(err);
        }
        console.log('Get Shipper by id Successful');
        res.send(shipper);
    });
};

exports.addShipper = (req, res) => {
    const shipper = req.body;
    Shipper.addShipper(shipper, (err, shipper) => {
        if (err) {
            res.send(err);
        }
        console.log('Add Shipper Successful');
        res.send(shipper);
    });
}

exports.updateShipper = (req, res) => {
    const shipper = req.body;
    Shipper.updateShipper(shipper, (err, shipper) => {
        if (err) {
            res.send(err);
        }
        console.log('Update Shipper Successful');
        res.send(shipper);
    });
}

exports.deleteShipper = (req, res) => {
    Shipper.deleteShipper(req.params.id, (err, shipper) => {
        if (err) {
            res.send(err);
        }
        console.log('Delete Shipper Successful');
        res.send(shipper);
    });
}


