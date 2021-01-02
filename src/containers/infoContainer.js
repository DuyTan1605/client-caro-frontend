import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Info from '../components/info/info';
import fetchChangeInfo from '../actions/actionChangeInfo';
import fetchChangePassword from "../actions/actionChangePassword";
import actionRefresh from "../actions/actionRefresh"
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.infoReducers.isFetching,
        message: state.infoReducers.message
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchChangeInfo,
            actionRefresh,
            fetchChangePassword
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);