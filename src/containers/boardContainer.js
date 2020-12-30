import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from '../components/home/listBoard';
import fetchBoard from '../actions/actionGetBoard';
import addBoard from "../actions/actionAddBoard";
import setBoard from "../actions/actionSetBoard"
// Connect variables
function mapStateToProps(state) {
    return {
        isFetching: state.boardReducers.isFetching,
        message: state.boardReducers.message,
        boardInfo: state.boardReducers.boardInfo
    };
}

// Connect functions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchBoard,
            addBoard,
            setBoard
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);