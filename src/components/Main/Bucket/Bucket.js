import {
  DeleteOutlined,
  EditOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Card, Checkbox, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";

const Bucket = ({ bucket }) => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileLink, setFileLink] = useState("");

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

  const openMenu = () => {
    console.log("Open Edit");
  };

  const deleteFiles = () => {
    console.log("Delete Files");
  };

  const openPlayerModal = (link) => {
    console.log("Open Player Modal");
    setIsModalOpen(true);
    setFileLink(link);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        title={`${bucket.name} - ${bucket.id}`}
        bordered={false}
        style={{
          width: 300,
        }}
        className="card"
        extra={
          showDelete && (
            <DeleteOutlined
              className="icon-delete cursor-pointer"
              onClick={deleteFiles}
            />
          )
        }
      >
        {files.length &&
          files?.map((file) => (
            <div
              key={file.id}
              className="p-4 my-2 flex flex-row items-center item-list"
            >
              <span className="flex">
                <Checkbox
                  className="px-2"
                  onChange={(e) => handleSelect(e, file.id)}
                />
                <span
                  className="flex flex-col cursor-pointer file-item"
                  onClick={(e) => openPlayerModal(file.link)}
                >
                  <span className="text-sm font-bold bucket-text">
                    {file.name}
                  </span>
                  <span className="text-xs bucket-link-text">{file.link}</span>
                </span>
              </span>
              <span className="flex">
                <RightCircleOutlined className="icon-move cursor-pointer" />
                <EditOutlined
                  className="icon-edit cursor-pointer"
                  onClick={openMenu}
                />
              </span>
            </div>
          ))}
        {!files.length && <p>No files in this bucket</p>}
      </Card>
      <Modal
        title="Player"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
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
