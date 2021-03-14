import React from "react";
import { io } from "socket.io-client";
import { UserContext } from "../UserProvider";

export default class Chat extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        var names = ["Aaron", "Adam", "Aidan", "Aiden", "Alex", "Alexander", "Alfie", "Andrew", "Anthony", "Archie", "Arthur", "Ashton", "Bailey", "Ben", "Benjamin", "Billy", "Blake", "Bobby", "Bradley", "Brandon", "Caleb", "Callum", "Cameron", "Charles", "Charlie", "Christopher", "Cody", "Connor", "Corey", "Daniel", "David", "Declan", "Dexter", "Dominic", "Dylan", "Edward", "Elliot", "Ellis", "Ethan", "Evan", "Ewan", "Finlay", "Finley", "Frankie", "Freddie", "Frederick", "Gabriel", "George", "Harley", "Harrison", "Harry", "Harvey", "Hayden", "Henry", "Isaac", "Jack", "Jackson", "Jacob", "Jake", "James", "Jamie", "Jay", "Jayden", "Jenson", "Joe", "Joel", "John", "Jonathan", "Jordan", "Joseph", "Josh", "Joshua", "Jude", "Kai", "Kayden", "Kian", "Kieran", "Kyle", "Leo", "Leon", "Lewis", "Liam", "Logan", "Louie", "Louis", "Luca", "Lucas", "Luke", "Mason", "Matthew", "Max", "Michael", "Morgan", "Nathan", "Nicholas", "Noah", "Oliver", "Ollie", "Oscar", "Owen", "Patrick", "Peter", "Reece", "Reuben", "Rhys", "Riley", "Robert", "Rory", "Ryan", "Sam", "Samuel", "Scott", "Sean", "Sebastian", "Spencer", "Stanley", "Taylor", "Theo", "Thomas", "Toby", "Tom", "Tommy", "Tyler", "William", "Zac", "Zachary", "Zak"];
        this.state = {
            txtInput: "",
            endpoint: 'http://localhost:3005/',
            messages: [],
            displayName: names[Math.floor(Math.random() * names.length)],
        };
        this.socket = io(this.state.endpoint, {});
    }
    

    componentDidMount() {
        const { messages } = this.state;
        const { classId } = this.props;

        this.socket.on("chat_received", (msg) => {
            messages.push(msg);
            this.setState({ messages }, () => {
                const list = document.getElementById("chat-window");
                list.scrollTop = list.scrollHeight;
            });
        });

        this.socket.on("connect", () => {
            console.log(this.socket.id);
        });

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/messages/${classId}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;

            this.setState({ messages: data });
        });
    }

    onChange = (e) => {
        this.setState({ txtInput: e.target.value });
    }

    sendMessage = () => {
        const { txtInput, messages, displayName } = this.state;
        const { classId } = this.props;

        messages.push({ name: "Me", content: txtInput });

        this.socket.emit("chat_send", { user: displayName, message: txtInput })

        this.setState({ txtInput: "", messages }, () => {
            const list = document.getElementById("chat-window");
            list.scrollTop = list.scrollHeight;
        });

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/messages/message`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: txtInput,
                userId: this.context.uid,
                classId
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;

            this.setState({ messages: data });
        });
    }

    render() {
        const { txtInput, messages } = this.state;

        return (
            <div>
                <div id="chat-window" className="chat-window" ref={el => { this.el = el; }} style={{ margin: '5px auto', backgroundColor: "white", padding: '5px', height: '200px', width: '50%', overflowY: 'scroll' }}>
                    {messages.map(message => (
                        <p><span>{(message.userId === this.context.uid) ? "Me" : message.name}: </span>{message.content}</p>
                    ))}
                </div>
                <div className="chat-box">
                    <input onChange={(e) => this.onChange(e)} value={txtInput} type="text"/>
                    <button onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        ); 
    }
}