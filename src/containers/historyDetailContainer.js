import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HistoryDetail from '../components/historyDetail/historyDetail';
import fetchHistoryDetail from '../actions/actionGetHistoryDetail';
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.historyDetailReducers.isFetching,
        message: state.historyDetailReducers.message,
        historyDetail : state.historyDetailReducers.historyDetail
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
           fetchHistoryDetail
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail);