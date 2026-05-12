


export class UpdateTodoDto {

     private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values(){

        const returnObjt: {[key:string]: any } = {};
        if(this.text) returnObjt.text = this.text;
        if(this.completedAt) returnObjt.completedAt = this.completedAt;

        return returnObjt;
    }
    

    static create(props:{[key:string]: any}): [string?,UpdateTodoDto?]{
        const {id,text,completedAt} = props;
        let newCompletedAt = completedAt

        if(!id || isNaN(Number(id))) return ['id is required'];

        if(completedAt){
             newCompletedAt = new Date(completedAt); 
            if(newCompletedAt.toString() === 'Invalid Date'){
                return ['completedAt must be a valid date'];
            }
        }

        return [, new UpdateTodoDto(Number(id),text,newCompletedAt)];

    } 
}