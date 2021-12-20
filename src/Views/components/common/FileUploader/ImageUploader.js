import { data } from "jquery";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ImageUploader = ({ onChange_ }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  // header, file, type, isAddsurvey
  const dispatch = useDispatch();

  const onChange = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) {
      return;
    }
    if (
      uploadedFile?.type === "image/jpeg" ||
      uploadedFile?.type === "image/png"
    ) {
      if (uploadedFile?.size > 5242880) {
        return toast.error("File Too Large", {
          position: "top-right",
        });
      } else {
        setFile(uploadedFile);
        setFilename(uploadedFile?.name);
        const url = URL.createObjectURL(uploadedFile);
        onChange_(url, uploadedFile.name);
      }
    } else {
      return toast.error("Only jpeg and png Images are allowed", {
        position: "top-right",
      });
    }
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group>
          <Form.File
            id="exampleFormControlFile1"
            onChange={onChange}
            name="backgroundImage"
          />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

export default ImageUploader;
