class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(unsubscriber) {
        this.subscribers.forEach((subscriber, i) => {
            if (unsubscriber === subscriber) {
                this.subscribers.splice(i, 1);
            } 
        })
    }

    publish(data) {
        this.subscribers.forEach((subscriber) => {
            subscriber.receiveData(data);
        })
    }
}


const colorObserveable = new Observable();

class Observer {
    receiveData(data) {
        this.handleReceiveData(data)
    }
}

class ShapeDrawer extends Observer {
    constructor(divId) {
        super();
        this.divId = divId;
    }

    handleReceiveData(data) {
        this.drawShape(data);
    }

    drawShape(data) {
        const div = this.getDiv();
        div.innerHTML= `<div style="background-color: ${data}; width: 10rem; height: 10rem;">${data}</div><br/>`;
    }

    getDiv() {
        if (!document.getElementById(this.divId)) {
            const div = document.createElement('div');
            div.id = this.divId;
            document.body.appendChild(div);
            return div;
        }
        return document.getElementById(this.divId);
    }
}

const shape1 = new ShapeDrawer('write');
const shape2 = new ShapeDrawer('write2')
const shape3 = new ShapeDrawer('write3')



document.getElementById('input').onkeyup = (e) => {
    colorObserveable.publish(e.target.value);
}

colorObserveable.subscribe(shape1);
colorObserveable.subscribe(shape2);
colorObserveable.subscribe(shape3);
console.log(colorObserveable);