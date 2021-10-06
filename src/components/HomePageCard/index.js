// @ts-nocheck
import { Link } from 'react-router-dom';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons/faLongArrowAltRight';

import Icon from 'components/Icon';

import './HomePageCard.css';

const HomePageCard = ({ title, subTitle, icon, links = [] }) => (
  <section className="w-1/2 p-8 mr-4 rounded border border-blue relative card">
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-bold flex items-center text-blue">
        <img src={icon} alt={title} className="mr-4" />
        {title}
      </h3>

      <p className="my-4">{subTitle}</p>

      <ul>
        {links.map(({ text, url, useRouter }) => (
          <li key={text}>
            {useRouter ? (
              <Link
                to={url}
                className="text-blue font-bold text-sm py-1 inline-block"
              >
                <Icon className="mr-1" iconName={faLongArrowAltRight} /> {text}
              </Link>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue font-bold text-sm py-1 inline-block"
              >
                <Icon className="mr-1" iconName={faLongArrowAltRight} /> {text}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomePageCard;
