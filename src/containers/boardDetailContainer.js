import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BoardDetail from '../components/home/board';
import actionJoinRoom from "../actions/actionJoinRoom"
// Connect variables
function mapStateToProps(state) {
    return {
       
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
          // actionJoinRoom
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetail);