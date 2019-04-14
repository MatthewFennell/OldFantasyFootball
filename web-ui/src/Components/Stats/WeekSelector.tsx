import * as React from 'react';

interface WeekProps {
    week: number
}

const WeekSelector: React.SFC<WeekProps> = (props) => {
	return (
		<div className="raise-week-dev">
            Week: {props.week}
		</div>
	);
};

export default WeekSelector;
