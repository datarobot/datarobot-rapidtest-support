/* eslint-disable no-param-reassign */
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
import { toast } from 'react-toastify';

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
  handleError,
  handleUpload,
  templateFile,
  templateName,
  clearErrors = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDataDisplay, setTableDataDisplay] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [, setIsSitesUpload] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [errorType, setErrorType] = useState();
  const [invalidColumns, setInvalidColumns] = useState();
  const [numInvalidColumns, setNumInvalidColumns] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const parseConfig = {
    header: true,
    complete(results) {
      const header = results.meta.fields;
      const valid = validator(header);

      if (results.data.length === 0 || header.length === 0) {
        setErrorType('empty');
        return setIsValid(false);
      }

      if (!header.includes('site_name')) {
        setIsSitesUpload(false);
      }

      if (!valid) {
        const { type, cols } = handleError(header);
        setInvalidColumns(cols.join(', '));
        setNumInvalidColumns(cols.length);
        setErrorType(type);
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

  const clearState = () => {
    setFiles([]);
    setTableColumns([]);
    setTableDataDisplay([]);
    setTableData([]);
    clearErrors();
  };

  const isCsv = (file) => file.name.split('.').pop() === 'csv';

  useEffect(() => {
    files.forEach((file) => {
      if (isCsv(file)) {
        Papa.parse(file, parseConfig);
      } else {
        toast.error('Only CSV files are permitted.', {
          onClose: () => setFiles([]),
        });
      }
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
                  <span className="text-blue">
                    Showing rows <span className="font-bold">1 - 10</span> of{' '}
                    <span className="font-bold">{tableData.length}</span> from
                  </span>{' '}
                  <span className="font-mono bg-gray-100 p-1 rounded border border-gray-200">
                    {files[0].name}
                  </span>
                </p>
                <div className="btn-row">
                  <Button
                    kind={KIND.CLEAR}
                    className="mr-2"
                    onClick={clearState}
                    label="Cancel"
                  />

                  <Button
                    kind={KIND.PRIMARY}
                    onClick={() => handleUpload(tableData)}
                    label="Upload"
                  />
                </div>
              </section>
              <section className="text-sm">
                <Table
                  tableOnly={true}
                  columns={tableColumns}
                  data={tableDataDisplay}
                />
              </section>
            </>
          ) : (
            <section className="error-msg">
              <div className="max-w-3xl text-center">
                <p className="sub-heading text-dark-red">
                  <em>{files[0].name}</em> is invalid.
                </p>
                <div className="my-4">
                  <p className="font-mono text-sm">{invalidColumns}</p>{' '}
                  <p className="mt-4">
                    {errorType === 'invalid' && (
                      <>
                        {numInvalidColumns === 1
                          ? 'is not a valid column name'
                          : 'are not valid column names'}
                      </>
                    )}
                    {errorType === 'empty' && (
                      <>This file does not contain any data.</>
                    )}
                    {errorType === 'required' && (
                      <>
                        {numInvalidColumns === 1
                          ? 'is a required column'
                          : 'are required columns'}
                      </>
                    )}
                    .
                  </p>
                </div>
                <div>
                  Please check the file and{' '}
                  <button
                    className="btn-link"
                    type="button"
                    onClick={() => {
                      setFiles([]);
                      setIsValid(true);
                    }}
                  >
                    try again
                  </button>
                  .
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default FileUpload;
