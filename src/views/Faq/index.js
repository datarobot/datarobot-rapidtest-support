// @ts-nocheck
import { useEffect, useState } from 'react';

import StaticContainer from 'components/StaticContainer';

import content from 'static/Faq.md';

const Faq = () => {
  const [staticText, setStaticText] = useState('');

  useEffect(() => {
    fetch(content)
      .then((response) => response.text())
      .then((text) => {
        setStaticText(text);
      });
  }, []);

  return <StaticContainer headline="FAQ" content={staticText} />;
};

export default Faq;
