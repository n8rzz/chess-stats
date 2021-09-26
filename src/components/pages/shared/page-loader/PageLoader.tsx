import React from 'react';
import { Image, Segment, Dimmer, Loader } from 'semantic-ui-react';

interface IProps {
  isActive: boolean;
}

export const PageLoader: React.FC<IProps> = (props) => {
  return (
    <Segment style={{ border: 0, height: '500px', overflow: 'hidden' }}>
      <Dimmer active={true} inverted={true}>
        <Loader size="massive">{'Loading game data'}</Loader>
      </Dimmer>

      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </Segment>
  );
};

PageLoader.displayName = 'PageLoader';
PageLoader.defaultProps = {};
