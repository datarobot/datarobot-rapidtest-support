// @ts-nocheck
import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import Icon from 'components/Icon';

import trainingMaterials from 'assets/static/TrainingMaterials.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import './TrainingMaterials.css';

const TrainingMaterials = () => {
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const onDocError = () => {
    setIsError(true);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="flex justify-center mt-2">
      {isError ? (
        <p className="sub-heading text-red">Something went wrong!</p>
      ) : (
        <section className="materials-container">
          <Document
            file={trainingMaterials}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocError}
          >
            <Page
              height={document.body.clientHeight - 120}
              pageNumber={pageNumber}
            />
          </Document>
          <div className="flex justify-between items-center py-4">
            <button className="btn-clear" onClick={handlePrevPage}>
              <Icon iconName="chevron-left" />
            </button>
            <p>
              Page {pageNumber} of {totalPages}
            </p>
            <button className="btn-clear" onClick={handleNextPage}>
              <Icon iconName="chevron-right" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default TrainingMaterials;
