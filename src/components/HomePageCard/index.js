import Icon from 'components/Icon';

import './HomePageCard.css';

const HomePageCard = ({ text, subText, icon, links = [] }) => (
  <section className="w-1/2 p-8 mr-4 rounded border border-blue relative card">
    <div className="flex flex-col justify-center">
      <h3 className="text-2xl font-bold flex items-center text-blue">
        <img src={icon} alt={text} className="mr-4" />
        {text}
      </h3>

      <p className="my-4">{subText}</p>

      <ul>
        {links.map((link) => (
          <li key={link.text}>
            <a
              href={link.url}
              className="text-blue font-bold text-sm py-1 inline-block"
            >
              <Icon className="mr-1" iconName="long-arrow-right" /> {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default HomePageCard;
