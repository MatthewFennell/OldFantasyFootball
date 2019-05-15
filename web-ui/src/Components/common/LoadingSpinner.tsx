import * as React from 'react';
import { Image } from 'react-bootstrap';
import '../../Style/Reusuable/LoadingSpinner.css';

interface LoadingSpinnerProps {
    isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
	return props.isLoading ? <div className="loading-spinner-wrapper-common">
		<Image
			alt="Loading Spinner"
			className="loading-spinner"
			src="Spinner.svg"
		/>
	</div> : null;
};

export default LoadingSpinner;
