import React from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-google-charts';
import actions from 'actions';
import { numberWithCommas } from 'formatHelper';

class Dashboard extends React.Component {
  componentDidMount() {
    // this.props.getStats();
  }
  renderValueContainer(icon, label, value, onClick = () => {}) {
    return (
      <button className="stat-value-container" key={label} onClick={onClick}>
        <div className="stat-icon-container">
          <img alt={label} src={icon} className="stat-icon" />
        </div>
        <div className="stat-value-content-container">
          <div className="stat-value-content">{numberWithCommas(value)}</div>
          <div className="stat-value-label">{label}</div>
        </div>
      </button>
    );
  }
  render() {
    if (!this.props.stats.platform) return <div />;
    const { userCount, userMonthCount, userActive, userLocationOn, talkCount, talkActiveCount, photoCount, photoActiveCount, app, platform, gender, createdAtDaily, purchaseCountMonthly } = this.props.stats;
    const styles = {
      container: { display: 'flex', flexWrap: 'wrap', width: '100%' },
      row: { display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'row', margin: 5, justifyContent: 'center' },
      chart: {
        container: { minWidth: 300, maxWidth: 500, height: 300, flex: 1, border: '1px solid gainsboro', margin: 5, borderRadius: 4 },
        fullContainer: { width: '100%', height: 300, border: '1px solid gainsboro', margin: 10, borderRadius: 4 },
      },
    };
    return (
      <div style={styles.container}>
        <div style={styles.row}>
          {this.renderValueContainer(require('ic_user_gray.png'), '총 가입자 수 (최근 한 달)', `${numberWithCommas(userCount)} (${numberWithCommas(userMonthCount)})`, () => this.props.pushRoute('/users'))}
          {this.renderValueContainer(require('ic_user_active_gray.png'), '실제 사용자 비율', userActive.total, () => this.props.pushRoute('/users'))}
          {this.renderValueContainer(require('ic_location_gray.png'), '위치기반 사용자 비율', userLocationOn.ratio, () => this.props.pushRoute('/users'))}
          {this.renderValueContainer(require('ic_talk_gray.png'), '총 토크 수 (게시 중)', `${numberWithCommas(talkCount)} (${numberWithCommas(talkActiveCount)})`, () => {
            this.props.updateTalksMeta({});
            this.props.pushRoute('/talks');
          })}
          {this.renderValueContainer(require('ic_photo_gray.png'), '총 포토 수 (게시 중)', `${numberWithCommas(photoCount)} (${numberWithCommas(photoActiveCount)})`, () => {
            this.props.updatePhotosMeta({});
            this.props.pushRoute('/photos');
          })}
        </div>
        <div style={styles.chart.fullContainer}>
          <Chart
            chartType="ColumnChart"
            data={[['날짜', '가입자 수', { role: 'style' }]].concat(createdAtDaily)}
            options={{ title: '일별 가입자 - 최근 한 달간 - ', colors: ['#4FBCF2'] }}
            graph_id="chart-created-at-daily"
            width="100%"
            height="100%"
            legend_toggle
          />
        </div>
        <div style={styles.chart.fullContainer}>
          <Chart
            chartType="LineChart"
            data={[['월', '구매 수']].concat(purchaseCountMonthly)}
            options={{ title: '월간 구매 수 - 지난 1년간 - ', colors: ['#FF7733'] }}
            graph_id="chart-puchaseCountMonthly"
            width="100%"
            height="100%"
            legend_toggle
          />
        </div>
        <div style={styles.row}>
          <div style={styles.chart.container}>
            <Chart
              chartType="PieChart"
              data={[['앱', '가입자 수']].concat(app)}
              options={{ title: '앱', colors: ['#C44340', '#70d67e', '#E96C77', '#6ecdf7'] }}
              graph_id="chart-app"
              width="100%"
              height="100%"
              legend_toggle
            />
          </div>
          <div style={styles.chart.container}>
            <Chart
              chartType="PieChart"
              data={[['기종', '가입자 수']].concat(platform)}
              options={{ title: '기종', colors: ['#68b445', 'darkgray'] }}
              graph_id="chart-platform"
              width="100%"
              height="100%"
              legend_toggle
            />
          </div>
          <div style={styles.chart.container}>
            <Chart
              chartType="PieChart"
              data={[['성별', '%']].concat(gender)}
              options={{ title: '성별', colors: ['#5FC2F3', '#F76F7F'], pieSliceTextStyle: { fontWeight: 'bold' } }}
              graph_id="chart-gender"
              width="100%"
              height="100%"
              legend_toggle
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  stats: state.stats,
}), actions)(Dashboard);
