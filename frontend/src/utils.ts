import cytoscape from 'cytoscape';
import { Event, Activity } from "./types/CpmClass";

export const graph = (activities: Activity[], events: Event[]) => {
    const edges = activities.map(activity => ({
        data: {
            id: activity.name,
            values: `${activity.name}\n${activity.start} - ${activity.end}\nTime: ${activity.time}`,
            
        }
    }));

    const nodes = events.map(event => ({
        data: {
            source: event.previous[0].name,
            target: event.name,
            label: `${event.name}\n${event.start} - ${event.finish}\nLoose: ${event.loose}`,
            
        }
    }));

    let cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [
            ...edges,
            ...nodes
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': 'white',
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
                    'color': 'black'
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
            }
        ],
        layout: {
            name: 'grid'
        },
        wheelSensitivity: 0,
        zoom: 0.1,
        userPanningEnabled: false
    });

    return cy;
};
