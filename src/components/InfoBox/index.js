import Icon from 'components/Icon';

const InfoBox = ({ heading, subtext }) => (
  <>
    <div className="leading-8 text-blue">
      <Icon iconName="question-circle" type="fal" />
    </div>
    <p className="font-bold mb-2 mt-4">{heading}</p>
    <p>
      {subtext ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae quisque urna quam mauris quis.'}
    </p>
  </>
);

export default InfoBox;
