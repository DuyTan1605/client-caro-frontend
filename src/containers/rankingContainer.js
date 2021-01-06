import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ranking from "../components/ranking/ranking"
import fetchRanking from "../actions/actionGetRanking"
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.rankingReducers.isFetching,
        message: state.rankingReducers.message,
        rankingInfo : state.rankingReducers.rankingInfo
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchRanking
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);