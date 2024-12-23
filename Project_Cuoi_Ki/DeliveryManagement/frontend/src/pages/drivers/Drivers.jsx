import React, { useEffect, useState } from 'react'
import { addShipper, getAllShippers } from '../../configs/ApiConfigs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../components/modal/Modal';
import instance from '../../configs/ApiConfigs';
import './Drivers.css';

function Drivers() {
    const [shippers, setShippers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const [newDriver, setNewDriver] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        email: '',
        vehicleType: '',
        licensePlate: '',
    });

    const getAllShipper = async () => {
        try {
            const response = await instance.get('/shipper');
            setShippers(response.data);
        } catch (error) {
            console.error('Error fetching shippers:', error);
        }
    };


    const handleAddDriver = async () => {
        try {
            const driver = {
                fullName: newDriver.fullName,
                phoneNumber: newDriver.phoneNumber,
                address: newDriver.address,
                email: newDriver.email,
                vehicleType: newDriver.vehicleType,
                licensePlate: newDriver.licensePlate,
            };
            const response = await addShipper(driver);
            setShippers([...shippers, response]);
            setNewDriver({ fullName: '', phoneNumber: '', address: '', email: '', vehicleType: '', licensePlate: '' });
            setIsModalOpen(false);
            toast.success('Add Driver successfully!');
            await getAllShipper();
        } catch (error) {
            console.error('Error adding driver:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const shippersResponse = await getAllShippers();

                console.log('Shippers:', shippersResponse);

                setShippers(shippersResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='driver-container'>
                <div className="header">
                    <div className="search">
                        <input
                            type="search"
                            placeholder="Search by any field..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="add" >
                        <button onClick={() => setIsModalOpen(true)}>+ New Driver</button>
                    </div>
                </div>

                <div>
                    <table border="1" cellPadding="10" cellSpacing="0">
                        <thead className="table-header">
                            <tr>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Vehicle Type</th>
                                <th>License Plate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shippers
                                .filter((shipper) => {
                                    // Kiểm tra giá trị trong ô search
                                    const matchesSearch = searchTerm === '' ||
                                        shipper.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shipper.phoneNumber.includes(searchTerm) ||
                                        shipper.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shipper.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shipper.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shipper.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        shipper.status.toLowerCase().includes(searchTerm.toLowerCase());

                                    return matchesSearch;

                                })
                                .map((shipper) => (
                                    <tr key={shipper.shipper_id}>
                                        <td>{shipper.fullName}</td>
                                        <td>{shipper.phoneNumber}</td>
                                        <td>{shipper.address}</td>
                                        <td>{shipper.email}</td>
                                        <td>{shipper.status}</td>
                                        <td>{shipper.vehicleType}</td>
                                        <td>{shipper.licensePlate}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="table-addDriver">
                        <h2 className="header-addnew">Add New Driver</h2>
                        <div className="input-text">
                            <input
                                type="text"
                                value={newDriver.fullName}
                                placeholder="Full Name"
                                onChange={(e) => setNewDriver({ ...newDriver, fullName: e.target.value })}
                            />
                        </div>
                        <div className="input-text">
                            <input
                                type="text"
                                value={newDriver.phoneNumber}
                                placeholder="Phone Number"
                                onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
                            />
                        </div>
                        <div className="input-text">
                            <input
                                type="text"
                                value={newDriver.address}
                                placeholder="Address"
                                onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                            />
                        </div>
                        <div className="input-text">
                            <input
                                type="text"
                                value={newDriver.email}
                                placeholder="Email"
                                onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                            />
                        </div>
                        <div className='input-text'>
                            <input
                                type="text"
                                value={newDriver.vehicleType}
                                placeholder="Vehicle Type"
                                onChange={(e) => setNewDriver({ ...newDriver, vehicleType: e.target.value })}
                            />
                        </div>
                        <div className='input-text'>
                            <input
                                type="text"
                                value={newDriver.licensePlate}
                                placeholder="License Plate"
                                onChange={(e) => setNewDriver({ ...newDriver, licensePlate: e.target.value })}
                            />
                        </div>

                        <div className="modal-buttons">
                            <button onClick={handleAddDriver} className="small-button">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="small-button">Close</button>
                        </div>
                    </div>
                </Modal>
            </div>

            <ToastContainer />
        </>
    )
}

export default Drivers
