import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
import { useState } from 'react';

export function Home() {
    const [participantes, setParticipantes] = useState<string[]>([]);
    const [participanteName, setParticipanteName] = useState('')
    function handleParticipantAdd() {
        if (participantes.includes(participanteName)) {
            return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
        }
        setParticipantes( prevState => [...prevState, participanteName])
        setParticipanteName('');
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `remover o participante ${name}?`, [
            {
                text: "Sim",
                onPress: () => setParticipantes(prevState => prevState.filter(participante => participante !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }
    return (
    <View style={styles.container}>
        <Text style={styles.eventName}>Nome do Evento</Text>
        <Text style={styles.eventDate}>Sexta, 29 de março de 2024.</Text>
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                placeholder='Nome do participante'
                placeholderTextColor="#6B6B6B" 
                onChangeText={setParticipanteName}
                value={participanteName}
                />
            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
            <Text style={styles.buttonText}>
                +
            </Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={participantes}
            keyExtractor={ item => item}
            renderItem={({ item }) => (
                <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)}/>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                    Ninguém chegou no evento ainda? adicione participantes a sua lista de presença.
                </Text>
            )}
        />
    </View>
  );
}
