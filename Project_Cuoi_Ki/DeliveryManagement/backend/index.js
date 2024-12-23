const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const ShipperRoutes = require('./src/routes/ShipperRoutes');
const OrderRoutes = require('./src/routes/OrderRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const ProvinceRoutes = require('./src/routes/ProvinceRoutes');
const DistrictRoutes = require('./src/routes/DistrictRoutes');
const WardRoutes = require('./src/routes/WardRoutes');
const PaymentTypeRoutes = require('./src/routes/PaymentTypeRoutes');
const AuthRoutes = require('./src/routes/AuthRoutes');

const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());
app.use('/shipper', ShipperRoutes);
app.use('/order', OrderRoutes);
app.use('/item', ItemRoutes);
app.use('/province', ProvinceRoutes);
app.use('/district', DistrictRoutes);
app.use('/ward', WardRoutes);
app.use('/payment_type', PaymentTypeRoutes);
app.use('/auth', AuthRoutes);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});