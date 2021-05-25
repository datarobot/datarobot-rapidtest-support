import { useAtom } from 'jotai';
import Highlighter from 'react-highlight-words';

import { quickFilterAtom } from 'rt-store';

const Highlight = ({ text }) => {
  const [quickFilter] = useAtom(quickFilterAtom);

  if (!text) return <span>-</span>;
  if (!quickFilter) return text;

  return (
    <Highlighter
      searchWords={quickFilter}
      autoEscape={true}
      textToHighlight={text}
    />
  );
};

export default Highlight;
