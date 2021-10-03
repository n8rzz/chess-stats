import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StatsPage } from '../../components/pages/stats/StatsPage';
import { StatsPageStore } from '../../components/pages/stats/StatsPage.store';

interface IProps {}

export const StatsPageRoute: React.FC<IProps> = observer((props) => {
  const [localStore] = useState(() => new StatsPageStore());

  return <StatsPage localStore={localStore} />;
});

export default StatsPageRoute;
