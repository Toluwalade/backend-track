const mongose = require('mongoose');
const Schema = mongose.Schema;

const DepartmentSchema = new Schema({
    name: { 
        type: String,
        required: true
    }, 
    employee: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee',
        }, 
    ]
},
{
    timestamps: true,
}
)


module.exports = mongose.model('Deparment', DepartmentSchema);  