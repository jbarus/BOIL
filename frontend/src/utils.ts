import cytoscape, {EdgeDataDefinition, NodeDataDefinition} from 'cytoscape';
import { Event, Activity } from "./types/CpmClass";

export const graph = (activities: Activity[], events: Event[]) => {
    const nodes = events.map(event => ({
        data: {
            id: event.name.toString(),
            values: `${event.name}\n${event.start}      ${event.finish}\n${event.loose}`,
            r: event.loose
        }
    }));

    const edges = activities.map(activity => ({
        data: {
            source: activity.startId.toString(),
            target: activity.endId.toString(),
            label: `${activity.name}${activity.cost}`,
            r: activity.cost
        }
    }));
    const container = document.createElement('div');
container.id = 'cy';

document.body.appendChild(container);

let cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
        ...nodes,
        ...edges
    ],
    style: [
        {
            selector: 'node',

            style: {
                'background-color' : 'white',
                'border-width': '2px',
                'border-color': 'black',
                'text-valign': 'center',
                'text-halign': 'center',
                'text-wrap': 'wrap',
                label: 'data(values)',
                width: '100px',
                height: '100px',
                'text-margin-y': 0,
                'text-margin-x': 0,
                'font-size': '20px',
                'color': 'black',

            }
        },
        {
          selector: 'node[r = 0]',
          style: {
              'background-color': '#c8e6c9',
          }
        },


        {
            selector: 'edge',
            style: {
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'width': 2,
                'label': 'data(label)',
                'text-rotation': 'autorotate',
                'text-margin-y': -20,
                'text-margin-x': 10
            }
        },
        {
            selector: 'edge[r = 0]',
            style : {
                'line-color': 'red',
                'target-arrow-color': 'red',
                'color' : 'red'
            }
        },
    ],
    layout: {
        name: 'grid',
    },
    wheelSensitivity: 0,
    zoom: 0.1,
    userPanningEnabled: false
});
    return cy;
};