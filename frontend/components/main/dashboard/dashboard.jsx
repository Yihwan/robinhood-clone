import React from 'react';
import DashboardSidebar from './dashboard_sidebar/dashboard_sidebar';
import DashboardSummary from './summary';
import DashboardChart from './dashboard_chart';
import { Link, withRouter } from 'react-router-dom';
import { currencyFormatter } from '../../../utils/helpers';
import { ScaleLoader } from 'halogenium';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    this.props.fetchPortfolio(this.props.currentUser.id)
      .then(() => this.props.fetchPortfolioSnapshots(this.props.currentUser.id))
      .then(() => this.props.fetchAssets())
      .then(() => this.setState({loading: false}));
    this.renderGreeting();
  }

  renderGreeting() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let greeting;

    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return(
      <h1 className="greeting">
        {greeting}, {this.props.currentUser.first_name}
      </h1>
    );
  }

  renderTags(tags) {
    return(
      tags.map((tag, idx) => {
        return <span key={idx} className='tag'>{tag}</span>;
      })
    );
  }

  handleClick(id) {
    return (e) => {
      this.props.history.push(`/assets/${id}`);
    };
  }

  renderTableRows(assets) {

    return(
      assets.map(asset => {
        return(
            <tr key={asset.id} className="main-table-row"
                onClick={this.handleClick(asset.id)}>
                <td className="asset-name">{asset.name}</td>
              <td>{asset.symbol}</td>
              <td>{currencyFormatter.format(asset.latest_price)}</td>
              <td>{this.renderTags(asset.tags)}</td>
            </tr>


        );
      })
    );
  }

  // with help from menubar.io, creating react tables
  renderAssetIndex(assets) {

    return(
      <section className="asset-index">
        <h1 className='sticky'>All Assets</h1>
        <table className="asset-table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Symbol</td>
              <td>Price</td>
              <td>Tags</td>
            </tr>
          </thead>

          <tbody>
            {this.renderTableRows(assets)}
          </tbody>
        </table>
      </section>
    );
  }

  render() {

    return(
      this.state.loading ?
        <div>
          <ScaleLoader
            className="loading-spinner"
            color="#21ce99"
            size="16px"
            margin="4px"/>
        </div>
      :
        <section className="main">
          <div className="left">

            <section className="summary-bar">
              {this.renderGreeting()}

              <DashboardChart
                snapshots={this.props.snapshots}
                portfolio={this.props.portfolio.data}
                user={this.props.currentUser}
                />

              <DashboardSummary
                portfolio={this.props.portfolio.data}
                user={this.props.currentUser}
                assets={this.props.assets}
              />


            </section>

            {this.renderAssetIndex(this.props.assets)}
          </div>

          <div className="right">
            <DashboardSidebar
              assets={this.props.assets}
              holdings={this.props.currentUser.holdings}
              watchlist={this.props.currentUser.watchlist}
            />
          </div>
        </section>
    );
  }
}

export default withRouter(Dashboard);
