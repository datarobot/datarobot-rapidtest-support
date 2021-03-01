/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

import Icon from 'components/Icon';
import Table from 'components/Table';

import './FileUpload.css';

const UploadLabel = () => (
  <>
    <Icon iconName="cloud-upload-alt" />
    <p>Drop files here to upload or</p>
    <p className="text-blue py-1 px-4 underline">Choose a file</p>
  </>
);

const FileUpload = ({ validator }) => {
  const [files, setFiles] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [, setIsSitesUpload] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });

  const parseConfig = {
    header: true,
    complete(results) {
      const header = Object.keys(results.data[0]);
      const valid = validator(header);
      if (!header.includes('site_name')) {
        setIsSitesUpload(false);
      }

      if (!valid) {
        return setIsValid(valid);
      }

      setTableData(results.data.slice(0, 10));
      for (let i = 0; i < header.length; i += 1) {
        const col = header[i];
        setTableColumns((prevState) => [
          ...prevState,
          { Header: col, accessor: col },
        ]);
      }
    },
  };

  useEffect(() => {
    files.forEach((file) => {
      Papa.parse(file, parseConfig);
    });
  }, [files]);

  return (
    <>
      {files.length === 0 ? (
        <>
          <p className="sub-heading text-blue mb-6">Select Files</p>
          <div className="upload-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <UploadLabel />}
          </div>
        </>
      ) : (
        <>
          {isValid ? (
            <>
              <section className="flex justify-between items-center border-b border-dark-blue pb-2 mb-2">
                <p className="text-xl">
                  <span className="text-blue font-bold">Preview of</span>{' '}
                  <span className="font-mono">{files[0].name}</span>
                </p>
                <div className="btn-row">
                  <button className="btn-clear mr-2">Cancel</button>
                  <button className="btn-primary">Upload</button>
                </div>
              </section>
              <Table tableOnly={true} columns={tableColumns} data={tableData} />
            </>
          ) : (
            <section className="error-msg">
              <p className="sub-heading text-dark-red">
                <em>{files[0].name}</em> is invalid.
              </p>
              <p>Please check the file and try again.</p>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default FileUpload;
