import React, { useState } from 'react';
import { Map as ReactMapGL, Source, Layer, Marker } from 'react-map-gl';
import axios from 'axios';
import './MapComponent.css';
import { IoSearchCircleSharp } from "react-icons/io5";

const MapComponent = () => {
    const [orderId, setOrderId] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [route, setRoute] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading

    const getCoordinates = async (address) => {
        const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=pk.eyJ1Ijoibmh1eWVuaHV5dGFuIiwiYSI6ImNtNHhwODRlbzBxazgyaXE3YjU4ZXV1ZnIifQ.KYW6evg5dnIYgfHD0YLtAg`;

        const response = await axios.get(geocodeURL);
        const features = response.data.features;

        if (features && features.length > 0) {
            const [longitude, latitude] = features[0].geometry.coordinates;
            return { longitude, latitude };
        }

        throw new Error('Không tìm thấy tọa độ');
    };

    const fetchRoute = async (from, to) => {
        const directionsURL = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?geometries=geojson&access_token=pk.eyJ1Ijoibmh1eWVuaHV5dGFuIiwiYSI6ImNtNHhwODRlbzBxazgyaXE3YjU4ZXV1ZnIifQ.KYW6evg5dnIYgfHD0YLtAg`;

        const response = await axios.get(directionsURL);
        const data = response.data;

        if (data.routes && data.routes.length > 0) {
            return data.routes[0].geometry;
        }

        throw new Error('Không tìm thấy tuyến đường');
    };

    const handleSearch = async () => {
        setError(null);
        setLoading(true); // Bắt đầu loading
        try {
            // Gọi API backend
            const response = await axios.get(`http://localhost:3010/order/${orderId}`);
            const { from_ward, from_district, from_province, to_ward, to_district, to_province } =
                response.data;

            // Địa chỉ đầy đủ
            const fromAddress = `${from_ward}, ${from_district}, ${from_province}`;
            const toAddress = `${to_ward}, ${to_district}, ${to_province}`;


            // Lấy tọa độ
            const fromCoordinates = await getCoordinates(fromAddress);
            const toCoordinates = await getCoordinates(toAddress);

            console.log(fromCoordinates, toCoordinates);

            setCoordinates({ from: fromCoordinates, to: toCoordinates });

            // Lấy tuyến đường
            const geometry = await fetchRoute(fromCoordinates, toCoordinates);
            setRoute(geometry);
        } catch (error) {
            setError('Không tìm thấy đơn hàng hoặc lỗi xảy ra');
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <div className="map-container">
            {/* Ô tìm kiếm */}
            <div className='header'>
                <div className="search">
                    <IoSearchCircleSharp className='search-icon' />
                    <input
                        className='search-input'
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Nhập mã đơn hàng"
                    />
                </div>
                <div className='add'>
                    <button className='add-btn' onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </div>

            <div className='mapgl'>
                <ReactMapGL
                    initialViewState={{
                        longitude: coordinates ? (coordinates.from.longitude + coordinates.to.longitude) / 2 : 106,
                        latitude: coordinates ? (coordinates.from.latitude + coordinates.to.latitude) / 2 : 20.9,
                        zoom: 6,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="pk.eyJ1Ijoibmh1eWVuaHV5dGFuIiwiYSI6ImNtNHhwODRlbzBxazgyaXE3YjU4ZXV1ZnIifQ.KYW6evg5dnIYgfHD0YLtAg"
                >

                    {/* Hiển thị tuyến đường */}
                    {route && (
                        <Source id="route" type="geojson" data={{ type: 'Feature', geometry: route }}>
                            <Layer
                                id="route-line"
                                type="line"
                                paint={{
                                    'line-color': '#ff0000',
                                    'line-width': 4,
                                }}
                            />
                        </Source>
                    )}
                </ReactMapGL>
            </div>
            {/* Bản đồ */}

        </div>
    );
};

export default MapComponent;
