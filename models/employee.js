const mongose = require('mongoose');
const Schema = mongose.Schema;

const EmployeeSchema = new Schema({
    username: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    position: { 
        type: String,
        required: true
    },
    department: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
},
{
    timestamps: true,
}
)

module.exports = mongose.model('Employee', EmployeeSchema);  