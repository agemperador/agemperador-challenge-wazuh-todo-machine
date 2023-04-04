import { schema } from '@osd/config-schema';

        
export const updateTodoSchema = schema.object({
    title: schema.string({ 
        maxLength:100,
        required:false
    }),
    priority:schema.string({ 
        maxLength:20,
        required:false
    }),
    description:schema.string({
        defaultValue: '',
        required: false
    }),
    id : schema.number(),
    deadLineDate: schema.string({
        format: 'date',
        defaultValue:'',
        required: false
    }),
    assignee: schema.string({
        defaultValue: '',
        required: false
    }),

})

export const addTodoSchema = schema.object({
            title: schema.string({ maxLength:100}),
            priority:schema.string({ 
                maxLength:20,
            }),
            deadLineDate: schema.string({
                format: 'date',
                defaultValue:'',
                required: false
            }), 
            assignee: schema.string({
                defaultValue: '',
                required: false
            }),
            description:schema.string({
                defaultValue: '',
                required: false
            }),

        })