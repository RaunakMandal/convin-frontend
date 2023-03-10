import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Input, Modal, Popover, Select } from "antd";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const Bucket = ({ bucket }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const [editing, setEditing] = useState(false);
  const [bucketName, setBucketName] = useState(bucket.name || "");
  const [buckets, setBuckets] = useState(
    JSON.parse(localStorage.getItem("buckets")) || []
  );
  const [bucketId, setBucketId] = useState("");
  const [file, setFile] = useState({
    name: "",
    link: "",
    bucket_id: bucket.id,
  });

  const handleSelect = (e, id) => {
    const { checked } = e.target;
    console.log(checked, id);
    if (checked) {
      setSelectedFiles([...selectedFiles, id]);
    } else {
      setSelectedFiles(selectedFiles.filter((file) => file !== id));
    }
  };

  const fetchBucketData = async (bucket_id) => {
    await fetch(`http://localhost:8080/files?bucket_id=${bucket_id}`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    const { name, value } = e.target;
    setFile({
      ...file,
      [name]: value,
    });
  };

  const deleteFiles = async () => {
    console.log("Delete Files", selectedFiles);
    for (const file of selectedFiles) {
      await fetch(`http://localhost:8080/files/${file}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          fetchBucketData(bucket.id);
        });
    }
  };

  const editBucket = async () => {
    await fetch(`http://localhost:8080/buckets/${bucket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bucketName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEditing(false);
      });
  };

  const openPlayerModal = (file) => {
    setIsModalOpen(true);
    setFileLink(file.link);

    const history = JSON.parse(localStorage.getItem("history")) || [];
    const newHistory = [
      ...history,
      {
        name: file.name,
        link: file.link,
        last_watched: new Date().toString(),
      },
    ];
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeBucket = async (file) => {
    await fetch(`http://localhost:8080/files/${file.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file.name,
        link: file.link,
        bucket_id: bucketId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFile = async (id) => {
    await fetch(`http://localhost:8080/files/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file.name,
        link: file.link,
        bucket_id: file.bucket_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchBucketData(bucket.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBucketData(bucket.id);
  }, [bucket.id]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [selectedFiles]);

  return (
    <>
      <Card
        title={
          <span className="flex flex-col items-start justify-center w-11/12">
            {editing ? (
              <Input
                name="name"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
              />
            ) : (
              <span className="text-lg font-bold">{bucketName}</span>
            )}
          </span>
        }
        bordered={false}
        style={{
          width: 300,
        }}
        className="card"
        extra={
          <>
            {editing ? (
              <>
                <CheckCircleOutlined
                  className="icon-save cursor-pointer"
                  onClick={editBucket}
                />
                <CloseOutlined
                  className="icon-close cursor-pointer"
                  onClick={(e) => setEditing(!editing)}
                />
              </>
            ) : (
              <EditOutlined
                className="icon-edit cursor-pointer"
                onClick={(e) => setEditing(!editing)}
              />
            )}
            {showDelete && (
              <DeleteOutlined
                className="icon-delete cursor-pointer"
                onClick={deleteFiles}
              />
            )}
          </>
        }
      >
        {files.length > 0 &&
          files?.map((file) => (
            <div
              key={file.id}
              className="p-4 my-2 flex flex-row items-center justify-between item-list"
            >
              <span className="flex">
                <Checkbox
                  className="px-2"
                  onChange={(e) => handleSelect(e, file.id)}
                />
                <span
                  className="flex flex-col cursor-pointer file-item"
                  onClick={(e) => openPlayerModal(file)}
                >
                  <span className="text-sm font-bold bucket-text">
                    {file.name}
                  </span>
                  <span className="text-xs bucket-link-text">{file.link}</span>
                </span>
              </span>
              <span className="flex">
                <Popover
                  content={
                    <>
                      <div className="flex items-center gap-1">
                        <Input value={bucket.name} disabled />
                        <ArrowRightOutlined />
                        <Select
                          onChange={(e) => setBucketId(e)}
                          defaultValue={bucket.name}
                        >
                          {buckets.map((bucket) => (
                            <Select.Option value={bucket.id} key={bucket.id}>
                              {bucket.name}
                            </Select.Option>
                          ))}
                        </Select>
                        <Button
                          type="primary"
                          danger
                          onClick={(e) => changeBucket(file)}
                        >
                          Move
                        </Button>
                      </div>
                    </>
                  }
                  title="Move to another bucket"
                  trigger="click"
                >
                  <RightCircleOutlined className="icon-move cursor-pointer" />
                </Popover>
                <Popover
                  content={
                    <>
                      <div className="flex flex-col items-center gap-1">
                        <Input
                          placeholder="New File Name..."
                          name="name"
                          onChange={(e) => handleFileChange(e)}
                        />
                        <Input
                          placeholder="New File Link..."
                          name="link"
                          onChange={(e) => handleFileChange(e)}
                        />
                        <Button
                          type="primary"
                          danger
                          onClick={(e) => editFile(file.id)}
                        >
                          Update
                        </Button>
                      </div>
                    </>
                  }
                  title="Edit File"
                  trigger="click"
                >
                  <EditOutlined className="icon-edit cursor-pointer" />
                </Popover>
              </span>
            </div>
          ))}
        {files.length === 0 && <p>No files in this bucket</p>}
      </Card>
      <Modal
        title="Player"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose={true}
      >
        <Iframe
          url={`${fileLink}?autoplay=1`}
          width="100%"
          height="320px"
          className="player-iframe"
          display="block"
          position="relative"
        />
      </Modal>
    </>
  );
};

export default Bucket;
