import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: String,

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},

		members: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				role: {
					type: String,
					default: 'Member',
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Project', projectSchema);