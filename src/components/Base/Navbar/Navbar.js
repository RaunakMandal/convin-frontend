import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Modal from "antd/es/modal/Modal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [buckets, setBuckets] = useState([]);
  const [bucket, setBucket] = useState({
    name: "",
  });
  const [file, setFile] = useState({
    name: "",
    link: "",
    bucket_id: "",
  });

  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (type) => {
    setIsModalOpen({
      open: true,
      type: type,
    });
  };

  const handleCancel = () => {
    setIsModalOpen({
      open: false,
      type: "",
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (isModalOpen.type === "bucket") {
      setBucket({
        ...bucket,
        [name]: value,
      });
    } else {
      setFile({
        ...file,
        [name]: value,
      });
    }
  };

  const selectAfter = (
    <Select
      defaultValue="Select"
      onChange={(e) => {
        setFile({
          ...file,
          bucket_id: e,
        });
      }}
    >
      {buckets.map((bucket) => (
        <Select.Option key={bucket.id} value={bucket.id}>
          {bucket.id}
        </Select.Option>
      ))}
    </Select>
  );

  const addBucket = async () => {
    setLoading(true);
    console.log("Add Bucket", bucket);
    await fetch("http://localhost:8080/buckets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bucket),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setIsModalOpen({
          open: false,
          type: "",
        });
        setBucket({
          name: "",
        });
      });
  };

  const addFile = async () => {
    setLoading(true);
    console.log("Add File", file);
    await fetch("http://localhost:8080/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setIsModalOpen({
          open: false,
          type: "",
        });
        setFile({
          name: "",
          link: "",
          bucket_id: "",
        });
      });
  };

  useEffect(() => {
    if (buckets.length === 0) {
      fetch("http://localhost:8080/buckets")
        .then((res) => res.json())
        .then((data) => {
          setBuckets(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="flex flex-row w-full justify-between p-4 h-full">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold">Convin</span>
        <span className="pages flex mx-4 gap-2">
          <Link className="text-lg font-bold link-text" to="/">
            Home
          </Link>
          <Link className="text-lg font-bold link-text" to="/history">
            History
          </Link>
        </span>
      </div>
      <div className="flex flex-row items-center">
        <Button className="mx-2" onClick={(e) => showModal("bucket")}>
          Add New Bucket
        </Button>
        <Button className="mx-2" onClick={(e) => showModal("file")}>
          Add New File
        </Button>
      </div>
      <Modal
        title={
          isModalOpen.type === "bucket" ? "Add New Bucket" : "Add New File"
        }
        open={isModalOpen.open}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={isModalOpen.type === "bucket" ? addBucket : addFile}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={isModalOpen.type === "bucket" ? "Bucket Name" : "File Name"}
            name="name"
            rules={[
              {
                required: true,
                message: "Empty name is not allowed!",
              },
            ]}
          >
            <Input name="name" onChange={(e) => handleChanges(e)} />
          </Form.Item>
          {isModalOpen.type === "file" && (
            <>
              <Form.Item
                label="File Embed Link"
                rules={[
                  {
                    required: true,
                    message: "Empty link is not allowed!",
                  },
                ]}
              >
                <Input name="link" onChange={(e) => handleChanges(e)} />
              </Form.Item>
              <Form.Item
                label="Bucket ID"
                rules={[
                  {
                    required: true,
                    message: "You need to select a bucket id!",
                  },
                ]}
              >
                <Input addonAfter={selectAfter} value={file.bucket_id} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default Navbar;
