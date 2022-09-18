import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario, pegarRepositoriosDoUsuarioPeloNome } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [nomeRepo, setNomeRepo] = useState('');
    const estaNaTela = useIsFocused();

    async function buscarRepositorioPorNome() {
        const resultado = await pegarRepositoriosDoUsuarioPeloNome(route.params.id, nomeRepo);
        setRepo(resultado);
        setNomeRepo('');
    }

    useEffect(async () => {
        const resultado = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultado);
    }, [estaNaTela]);

    return (
        <>
            <View style={estilos.container}>
                <TextInput
                    value={nomeRepo}
                    onChangeText={setNomeRepo}
                    placeholder='Busque por um repositório'
                    autoCapitalize='none'
                    style={estilos.entrada}
                />
                <TouchableOpacity
                    onPress={buscarRepositorioPorNome}
                    style={estilos.botao}
                >
                    <Text style={estilos.textoBotao}>Buscar</Text>
                </TouchableOpacity>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                <FlatList
                    data={repo}
                    style={{width: '100%'}}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio', { item })}
                        >
                            <Text style={estilos.repositorioNome}>{ item.name }</Text>
                            <Text style={estilos.repositorioData}>Atualizado em { item.data }</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </>
    );
}
