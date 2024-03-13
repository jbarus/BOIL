
export class Event {
    name: string;

    constructor(eventName: string) {
        this.name = eventName;
        
    }


}


export class Action {
    time:number;
    parents:Event[];
    childrens:Event[];

        constructor(time:number,parents:Event[],childrens:Event[]) {
            this.childrens=childrens;
            this.parents=parents;
            this.time=time;
        }
    }

