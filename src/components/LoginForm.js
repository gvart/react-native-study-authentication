import React, {Component} from 'react';
import firebase from 'firebase';
import {Text} from 'react-native'
import {Button, Card, CardSection, Input, Spinner} from "./common";

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFaile.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState( {
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }


    onLoginFaile() {
        this.setState( {
            error: 'Authentication Failed.',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
          return <Spinner size={'small'}/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@email.com"
                        value={ this.state.email }
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Password"
                        placeholder="password"
                        secureTextEntry={true}
                        value={ this.state.password }
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};