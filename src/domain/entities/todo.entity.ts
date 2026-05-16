


export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ) {}

    get isCompleted(){
        return !!this.completedAt;
    }

    public static formObject(object: {[key: string]: any}): TodoEntity{
        const {id,text,completedAt} = object
        if(!id) throw new Error('ID is required');
        if(!text) throw new Error('Text is required');
        
        let newCommpletedAt;
        if(completedAt){
            newCommpletedAt = new Date(completedAt);
            if(isNaN(newCommpletedAt.getTime())){
                throw new Error('CompletedAt is not a valid date');
            }
        }
        return new TodoEntity(id, text, newCommpletedAt);

    }
    

}