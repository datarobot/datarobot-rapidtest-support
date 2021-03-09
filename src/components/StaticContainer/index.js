import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './StaticContainer.css';

const StaticContainer = ({ headline, content }) => (
  <section className="static">
    <h1 className="headline text-blue">{headline}</h1>

    <section className="static-content my-12 prose">
      <ReactMarkdown plugins={[gfm]} allowDangerousHtml>
        {content}
      </ReactMarkdown>
    </section>
  </section>
);

export default StaticContainer;
