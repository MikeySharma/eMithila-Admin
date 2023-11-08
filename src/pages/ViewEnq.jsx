import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAEnq, updateEnq, resetEnq } from '../features/enquiries/enquiriesSlice';
import { toast } from 'react-toastify';
import {ArrowLeftOutlined } from '@ant-design/icons';

const ViewEnq = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const enqId = location.pathname.split('/')[3];
	useEffect(() => {
		if (enqId !== undefined) {
			dispatch(getAEnq(enqId));
		}

	}, [enqId])

	const getEnq = useSelector((state) => state.enq.getEnq);
	const EnqState = useSelector((state) => state.enq);
	const { updatedEnq, isError, isSuccess } = EnqState;
	useEffect(() => {
		if (updatedEnq && isSuccess) {
			dispatch(resetEnq());
			toast.success('Enquiry Updated Successfully');
		} else if (isError) {
			toast.error('Something went wrong');
		}
		dispatch(getAEnq(enqId));
	}, [updatedEnq])

	const handleStatus = (value) => {
		if (enqId !== undefined) {
			const data = { id: enqId, status: value };
			dispatch(updateEnq(data));
		}

	}




	return (
		<div>
			<div className="flex justify-between items-center">
			<h3 className="my-5 text-2xl font-medium">View Enquiry</h3>
			<span onClick={()=> navigate(-1)} className="text-md font-medium cursor-pointer p-2 bg-white border-2 border-gray-200 rounded-md flex gap-2 items-center"><ArrowLeftOutlined />Go Back</span>
			</div>
			<div className="bg-white p-2 rounded-md border-2 border-gray-200">
				<div className="flex justify-start flex-col gap-3">
					<p className="text-md flex items-center gap-2">
						<span className="text-md font-bold">Name</span>
						:
						<span className="text-md font-medium">{getEnq ? getEnq.name : ''}</span>
					</p>
					<p className="text-md flex items-center gap-2">
						<span className="text-md font-bold">Email</span>
						:
						<span className="text-md font-medium">{getEnq ? getEnq.email : ''}</span>
					</p>
					<p className="text-md flex items-center gap-2">
						<span className="text-md font-bold">Mobile Number</span>
						:
						<span className="text-md font-medium">{getEnq ? getEnq.mobile : ''}</span>
					</p>
					<p className="text-md flex items-center gap-2">
						<span className="text-md font-bold">Comment</span>
						:
						<span className="text-md font-medium">{getEnq ? getEnq.comment : ''}</span>
					</p>
					<p className="text-md flex items-center gap-2">
						<span className="text-md font-bold">Comment</span>
						:
						<span className="text-md font-medium">
							<select name="status" value={getEnq ? getEnq.status : 'Submited'} onChange={(e) => handleStatus(e.target.value)}>
								<option value="Submited">Submited</option>
								<option value="Contacted">Contacted</option>
								<option value="InProgress">InProgress</option>
								<option value="Resolved">Resolved</option>
							</select>
						</span>
					</p>

				</div>
			</div>
		</div>
	)
}

export default ViewEnq