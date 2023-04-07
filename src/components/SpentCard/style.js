import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e3e3e3',
        padding: 15,
        borderRadius: 20,
        elevation: 4,
    },
    spentName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        opacity: 0.80,
    },
    spentValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        opacity: 0.95
    }
});