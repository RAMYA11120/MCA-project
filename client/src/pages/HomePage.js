import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { motion } from "framer-motion";
import bloodimag from '../assets/blooddonate.png'
import donar1 from '../assets/donar1.png'
import donar2 from '../assets/donar3.png'

import donar3 from '../assets/dona2.png'
import donar4 from '../assets/donar4.png'
import donar5 from '../assets/donar5.png'
import donar6 from '../assets/donar6.png'
import donar7 from '../assets/donar7.png'






const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {user?.role === "admin" && navigate("/admin")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <motion.div
            className="container mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <motion.div
              className="p-5 text-center bg-dark text-white rounded shadow"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="display-5 fw-bold">Donate Blood, Save Lives</h1>
              <p className="lead">Be a real-life hero. Your donation makes a difference.</p>
              <img
                src={bloodimag}
                alt="Blood Donation"
                className="img-fluid mt-3"
                style={{ maxHeight: "250px" }}
              />
            </motion.div>

            {/* Informative Articles */}
            <div className="row my-5">
              {[
                {
                  title: "Why Donate?",
                  text: "Every drop of blood you donate can save up to three lives.",
                  img: donar1,
                },
                {
                  title: "Healthy for You",
                  text: "Blood donation improves heart health and reduces harmful iron.",
                  img: donar2,
                },
                {
                  title: "Be a Hero",
                  text: "It takes less than an hour to change a life.",
                  img: donar3,
                },
               {
    title: "Quick Recovery",
    text: "Your body replenishes the donated blood within days, keeping you healthy.",
    img: donar4,
  },
  {
    title: "Community Impact",
    text: "Support your local hospitals and save lives in your neighborhood.",
    img: donar5,
  },
  {
    title: "Free Health Check",
    text: "Each donation includes a mini health screening at no cost.",
    img: donar6,
  },
  {
    title: "Make a Habit",
    text: "Regular donations can become a powerful habit of giving.",
    img: donar7,
  }
              ].map((card, index) => (
                <motion.div
                  className="col-md-4"
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <div className="card shadow mb-4">
                    <img src={card.img} className="card-img-top" alt={card.title} />
                    <div className="card-body">
                      <h5 className="card-title">{card.title}</h5>
                      <p className="card-text">{card.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Inventory Section */}
            {user?.role !== "donar" && (
              <motion.h4
                className="ms-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <i className="fa-solid fa-plus text-success py-4"></i>
                Add Inventory
              </motion.h4>
            )}

            <motion.div
              className="table-responsive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <table className="table table-bordered shadow">
                <thead className="table-dark">
                  <tr>
                    <th>Blood Group</th>
                    <th>Inventory Type</th>
                    <th>Quantity</th>
                    <th>Donor Email</th>
                    <th>Time & Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity} (ML)</td>
                      <td>{record.email}</td>
                      <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <Modal />
          </motion.div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
