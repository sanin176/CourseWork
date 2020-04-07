import React, {Component} from "react";

import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to the Faculty of Information Technology</h1>
                <blockquote className="blockquote mb-0">
                    <p>
                        Good friends, good books, and a sleeply conscience: this is the ideal life.
                    </p>
                    <footer className="blockquote-footer">
                        Mark Twain
                    </footer>
                </blockquote>
            </Jumbotron>
        )
    }
}