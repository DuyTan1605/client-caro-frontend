import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import History from '../components/history/history';
import fetchHistoryInfo from '../actions/actionGetHistory';
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.historyReducers.isFetching,
        message: state.historyReducers.message,
        historyInfo : state.historyReducers.historyInfo
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
           fetchHistoryInfo
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);