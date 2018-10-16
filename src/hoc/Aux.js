import { withRouter } from 'react-router-dom';

const aux = (props) => props.children || null;

export default withRouter(aux);