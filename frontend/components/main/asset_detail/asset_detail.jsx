import React from 'react';
import { Link } from 'react-router-dom';
import TradeSidebar from './trade_sidebar/trade_sidebar';
import AssetSummary from './asset_research/asset_summary';
import AssetAbout from './asset_research/asset_about';
import AssetChart from './asset_research/asset_chart';
import AssetWatch from './asset_watch';

class AssetDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
     };
  }

  componentDidMount() {
    this.props.fetchAsset(this.props.match.params.assetId)
      .then(() => this.props.fetchLatestPrice(this.props.asset.fake_symbol))
      .then(() => this.props.fetchStats(this.props.asset.fake_symbol))
      .then(() => this.setState({loading: false}));
  }

  render() {

    return(
      this.state.loading ?
        <div>Loading...</div>
      :
        <section className="main">
          <div className="left">
            <AssetSummary asset={this.props.asset}/>
            <AssetChart
              asset={this.props.asset}
              latestPrice={this.props.latestPrice}
            />
            <AssetAbout
              asset={this.props.asset}
              stats={this.props.stats}
            />
          </div>
          <div className="right">
            <TradeSidebar
              asset={this.props.asset}
              latestPrice={this.props.latestPrice}
            />

          <div className="asset-watch">
            <AssetWatch
              watchAsset = {this.props.watchAsset}
              unwatchAsset = {this.props.unwatchAsset}
              asset = {this.props.asset}
              watchlist = {this.props.currentUser.watchlist}
            />
          </div>
          </div>
        </section>

    );
  }
}

export default AssetDetail;
