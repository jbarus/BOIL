export class Event {
    start: number;
    name: string;

    // previous: Array<Event> = [];
    // next: Array<Event> = [];
    
    finish: number;
    loose: number;



    constructor(eventName: string) {
        this.name = eventName;
        this.start = 0;
        this.finish = 0
        this.loose = 0
    }



}



export class Activity {
    name:string
    cost: number;
    startId: string;
    endId: string;

    constructor(name:string,time: number, start: string, end: string) {
        this.name=name;
        this.startId = start;
        this.endId = end;
        this.cost = time;
    }
}