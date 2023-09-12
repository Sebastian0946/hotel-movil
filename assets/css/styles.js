import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    searchButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
    },

    deleteButton: {
        backgroundColor: 'red', 
        padding: 10,
        borderRadius: 5,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 20,
        backgroundColor: '#2196f3',
        paddingVertical: 6,
        marginVertical: 20,
        paddingHorizontal: 12,
        borderRadius: 100,
        alignItems: 'center',
    },
    Icon: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 30,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalFieldContainer: {
        marginBottom: 10,
    },
    modalLabel: {
        fontWeight: 'bold',
        marginRight: 10,
        color: 'black',
    },
    requiredAsterisk: {
        color: 'red',
    },
    modalInputContainer: {
        marginBottom: 10,
    },
    modalInput: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        width: '80%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    picker: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0,
    },
    saveButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 4,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 8,
    },
});