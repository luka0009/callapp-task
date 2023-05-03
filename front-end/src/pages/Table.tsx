import React, { useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Data } from "../types";
import useDataStore from "../zustand/data";
import axios from "axios";
import "../index.css";
import { Link } from "react-router-dom";

const TableComponent: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [theId, setTheId] = useState<any>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const fetchData = () => { axios
  .get<Data[]>("http://localhost:3000/data")
  .then((response) => {
    useDataStore.setState({ data: response.data });
  })
  .catch((error) => {
    console.error(error);
  });
}

  const handleSubmitUpdate = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      address: {
        street: formData.get("street"),
        city: formData.get("city"),
      },
      phone: formData.get("phone"),
    };
    axios
      .patch(`http://localhost:3000/data/${theId}`, data)
      .then(function (response) {
        console.log(response.data);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setUpdateModal(false));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      address: {
        street: formData.get("street"),
        city: formData.get("city"),
      },
      phone: formData.get("phone"),
    };
    axios
      .post("http://localhost:3000/data", data)
      .then(function (response) {
        console.log(response.data);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setShowModal(false));
  };

  const handleDelete = (e: any) => {
    const buttonId = e.target.getAttribute("id");

    axios
      .delete<Data[]>(`http://localhost:3000/data/${buttonId}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e: any) => {
    setUpdateModal(true);
    const buttonId = e.target.getAttribute("id");
    setTheId(buttonId);
    setName(dataStore.data[buttonId - 1].name);
    setEmail(dataStore.data[buttonId - 1].email);
    setStreet(dataStore.data[buttonId - 1].address.street);
    setCity(dataStore.data[buttonId - 1].address.city);
    setPhone(dataStore.data[buttonId - 1].phone);
    setGender(dataStore.data[buttonId - 1].gender);
  };

  const dataStore = useDataStore();

  const data: Data[] = dataStore.data;

  const columns: ColumnsType<Data> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      key: "address",
      render: (_, record) => (
        <span>
          {record.address.street}, {record.address.city}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <button id={`${record.id}`} onClick={handleUpdate} style={{ backgroundColor: '#007bff', color: '#fff', border: '1px solid #007bff', padding: '0.375rem 1rem', fontSize: '1rem', lineHeight: '1.2', margin: '0 0.5rem', cursor: 'pointer', borderRadius: "8px" }}>
            Update
          </button>
          <button onClick={handleDelete} id={`${record.id}`} style={{ backgroundColor: '#dc3525', color: '#fff', border: '1px solid #dc3545', padding: '0.375rem 1rem', fontSize: '1rem', lineHeight: '1.2', margin: '0 0.5rem', cursor: 'pointer', borderRadius: "8px"}}>
            Delete
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" style={{margin: '10px', scale: '1.1'}} onClick={() => setShowModal(true)} >
        Add Item
      </Button>
      <Link to='/piechart'>
      <Button type="primary" style={{background: 'Black',margin: '10px', scale: '1.1'}} onClick={() => setShowModal(true)} >
        See Pie chart
      </Button>
      </Link>
      {showModal && (
        <Modal
          title="Add Item"
          open={showModal}
          //   onOk={() => console.log("")}
          onCancel={() => setShowModal(false)}
          destroyOnClose={true}
        >
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input required type="text" id="name" name="name" />

            <label htmlFor="email">Email:</label>
            <input required type="email" id="email" name="email" />

            <label htmlFor="gender">Gender:</label>
            <select required id="gender" name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="street">Street:</label>
            <input required type="text" id="street" name="street" />

            <label htmlFor="city">City:</label>
            <input required type="text" id="city" name="city" />

            <label htmlFor="phone">Phone:</label>
            <input
              required
              type="tel"
              inputMode="numeric"
              id="phone"
              name="phone"
            />

            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      {updateModal && (
        <Modal
          title="Update Item"
          open={updateModal}
          //   onOk={() => console.log("")}
          onCancel={() => setUpdateModal(false)}
          destroyOnClose={true}
        >
          <form className="modal-form" onSubmit={handleSubmitUpdate}>
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="gender">Gender:</label>
            <select
              required
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="street">Street:</label>
            <input
              required
              type="text"
              id="street"
              name="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <label htmlFor="city">City:</label>
            <input
              required
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="phone">Phone:</label>
            <input
              required
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        onRow={(record) => {
            return {
              onDoubleClick: () => {
                setUpdateModal(true);
                setTheId(record.id);
                setName(record.name);
                setEmail(record.email);
                setStreet(record.address.street);
                setCity(record.address.city);
                setPhone(record.phone);
                setGender(record.gender);
              },
            };
          }}
      />
    </>
  );
};

export default TableComponent;
