import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Homepage from "../components/home/index"
import fetchInfo from "../actions/actionGetInfo"
import actionRefresh from '../actions/actionRefresh';
import actionJoinRoom from '../actions/actionJoinRoom';
import actionResetGame from '../actions/actionResetGame';
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.infoReducers.isFetching,
        didInvalidate: state.infoReducers.didInvalidate,
        userInfo: state.infoReducers.userInfo,
        roomInfo: state.roomReducers.roomInfo
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchInfo,
            actionJoinRoom,
            actionRefresh,
            actionResetGame
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);