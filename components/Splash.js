import React, { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet, Easing, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p/400Regular';

const SplashScreen = ({ onHide }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    const [fontsLoaded] = useFonts({
        PressStart2P_400Regular,
    });

    useEffect(() => {
        if (!fontsLoaded) return;

        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 3200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 4200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(3000),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 1800,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => onHide && onHide());
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    return (
        <LinearGradient
            colors={["#2c4a37", "#a26536"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Animated.View
                style={[styles.textContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
            >
                <Text style={styles.title}>The Annoying Ninja Cat</Text>
                <Text style={styles.creator}>By: Adrian Landia</Text>
                <Text style={styles.instructions}>Instructions: Just keep going up!</Text>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    textContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "transparent",
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#ffffff30",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
    },
    title: {
        fontSize: 38,
        fontWeight: "normal",
        color: "#ffffff",
        letterSpacing: 1.5,
        textAlign: "center",
        fontFamily: "PressStart2P_400Regular",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
        marginBottom: 30,
        paddingTop: 20,
    },

    instructions: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#ffffff",
        letterSpacing: 1.5,
        textAlign: "center",
        fontFamily: "PressStart2P_400Regular",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
    },
    creator: {
        fontSize: 24,
        fontWeight: "normal",
        color: "#ffffff",
        letterSpacing: 1.5,
        textAlign: "center",
        fontFamily: "PressStart2P_400Regular",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
        marginBottom: 30,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
});

export default SplashScreen;
