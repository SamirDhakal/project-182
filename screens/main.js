import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity } from "react-native-web";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";
import Filter1 from "./filter1";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            faces: []
        }

        this.onFacesDetected = this.onFacesDetected.bind(this);
    }

    async componentDidMount() {
        const {status} = await Camera.requestPermissionsAsync();
        this.setState({
            hasCameraPermission: status === "granted"
        });
    }

    onFacesDetected({faces}) {
        this.setState({
            faces: faces
        });
    }

    onFacesDetectionError = (error) => {
        console.log(error);
    }

    render() {
        return(
            <View>
                <Camera
                style = {{flex: 1}}
                type = {Camera.Constants.Type.front}
                faceDetectorSettings = {{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.all,
                    runClassifications: FaceDetector.Constants.Classifications.all
                }}
                onFacesDetected = {this.onFacesDetected}
                onFacesDetectionError = {this.onFacesDetectionError}
                />
                {this.state.faces.map(face => {
                    <Filter1 key = {`face-id-${face.faceID}`} face = {face}/>
                })}
            </View>
        )
    }
}
