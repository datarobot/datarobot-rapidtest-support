/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';

import Button, { KIND } from 'components/Button';
import Icon from 'components/Icon';
import Table from 'components/Table';

import { isEqual } from 'utils';

import './FileUpload.css';

const UploadLabel = () => (
  <>
    <Icon iconName="cloud-upload-alt" size="2x" color="#00528D" type="far" />
    <p>Drop files here to upload or</p>
    <p className="text-blue underline">Choose a file</p>
    <p className="absolute bottom-0 pb-2">
      Accepted formats:{' '}
      <span className="font-mono inline-block px-1 rounded-full bg-gray-200 border border-gray-300 text-sm">
        .csv
      </span>
    </p>
  </>
);

const FileUpload = ({
  validator,
  handleUpload,
  templateFile,
  templateName,
}) => {
  const [files, setFiles] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDataDisplay, setTableDataDisplay] = useState([]);
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
      const header = results.meta.fields;
      const valid = validator(header);
      if (!header.includes('site_name')) {
        setIsSitesUpload(false);
      }

      if (!valid) {
        return setIsValid(valid);
      }

      if (isEqual({ [header[0]]: '' }, results.data[results.data.length - 1])) {
        results.data.pop();
      }

      setTableDataDisplay(results.data.slice(0, 10));
      setTableData(results.data);

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
          <section className="flex justify-between items-center max-w-lg mb-4">
            <p className="sub-heading text-blue">Select Files</p>
            <a
              href={templateFile}
              download={templateName}
              className="btn-clear"
            >
              Download a template file.
            </a>
          </section>
          <div className="upload-container" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <UploadLabel />}
          </div>
        </>
      ) : (
        <>
          {isValid ? (
            <>
              <section className="flex justify-between items-center border-b border-blue-dark pb-2 mb-2">
                <p className="text-xl">
                  <span className="text-blue font-bold">Preview of</span>{' '}
                  <span className="font-mono">{files[0].name}</span>
                </p>
                <div className="btn-row">
                  <Button
                    kind={KIND.CLEAR}
                    className="mr-2"
                    onClick={() => setFiles([])}
                    label="Cancel"
                  />

                  <Button
                    kind={KIND.PRIMARY}
                    onClick={() => handleUpload(tableData)}
                    label="Upload"
                  />
                </div>
              </section>
              <Table
                tableOnly={true}
                columns={tableColumns}
                data={tableDataDisplay}
              />
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
