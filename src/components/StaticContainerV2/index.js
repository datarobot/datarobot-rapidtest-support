// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import gfm from 'remark-gfm';

import unified from 'unified';
import markdown from 'remark-parse';
import slug from 'remark-slug';
import toc from '@jsdevtools/rehype-toc';
import github from 'remark-github';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';

import program from 'assets/static/ProgramFAQ.md';
import test from 'assets/static/TestFAQ.md';
import general from 'assets/static/FAQ.md';

import './StaticContainerV2.css';

const processor = unified()
  .use(markdown)
  .use(slug)
  .use(github, { repository: 'rehypejs/rehype-react' })
  .use(remark2rehype)
  .use(rehype2react, { createElement: React.createElement })
  .use(toc, {
    headings: ['h3'],
    cssClasses: {
      toc: 'page-outline',
      link: 'page-link',
    },
  });

const StaticContainerV2 = () => {
  const { id } = useParams();
  const [staticText, setStaticText] = useState('');
  const [contentRoute, setContentRoute] = useState();
  const [pageTitle, setPageTitle] = useState('');

  const getContent = () => {
    fetch(contentRoute)
      .then((response) => response.text())
      .then((text) => {
        setStaticText(text);
      });
  };

  useEffect(() => {
    if (contentRoute) {
      getContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRoute]);

  useEffect(() => {
    if (id === 'program') {
      setPageTitle('Program Admin FAQs');
      return setContentRoute(program);
    }

    if (id === 'test') {
      setPageTitle('Test Operator FAQs');
      return setContentRoute(test);
    }

    setPageTitle('General FAQs');
    return setContentRoute(general);
  }, [id]);

  return (
    <section className="static-content-v2">
      <section className="prose max-w-none">
        {processor.processSync(staticText).result}
      </section>
    </section>
  );
};

export default StaticContainerV2;
