import React from 'react';
import '../styles/index.scss';
import ProgressChart from './components/ProgressChart';
import ContributionRiskGraph from './components/ContributionRiskGraph';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Graphs App</h1>
        {/*<ProgressChart/>*/}
				<ContributionRiskGraph/>
      </div>
    )
  }
}
