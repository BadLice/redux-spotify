import { Pagination } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CustomPagination = ({
	rootPath,
	pageNumber,
	total,
	limit,
	restoreFunction,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	pageNumber = Number(pageNumber);

	const handleChangePage = (pageNumber) => {
		history.push(`${rootPath}/${pageNumber}`);
		dispatch(restoreFunction);
	};

	return (
		<center>
			<Pagination
				current={pageNumber}
				total={total}
				defaultPageSize={limit}
				onChange={handleChangePage}
			/>
		</center>
	);
};

export default CustomPagination;
