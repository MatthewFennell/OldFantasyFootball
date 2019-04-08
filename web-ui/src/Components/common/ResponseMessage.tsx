/* eslint-disable react/require-optimization */
import * as React from 'react';
import '../../Style/Reusuable/ResponseMessage.css';

interface ResponseMessageProps {
    responseMessage: string;
	shouldDisplay: boolean;
	isError: boolean;
}

interface ResponseMessageState {
}

// eslint-disable-next-line react/prefer-stateless-function
class ResponseMessage extends React.Component<ResponseMessageProps, ResponseMessageState> {
	calculateClassName (isError:boolean) {
		return isError ? 'error-response-message' : 'successful-response-message';
	}

	render () {
		return this.props.shouldDisplay ? (<div className={this.calculateClassName(this.props.isError)}>
			{this.props.responseMessage}
		</div>) : (null);
	}
}
export default ResponseMessage;
