<<<<<<< HEAD
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem("name");
      const savedUserID = await AsyncStorage.getItem("userID");
=======
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Profile() {
  const [name, setName] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem('name');
      const savedUserID = await AsyncStorage.getItem('userID');
>>>>>>> 588ae75db124f2314e1380ef229ce0e88efab5e2

      if (savedName) setName(savedName);
      if (savedUserID) setUserID(savedUserID);
    })();
  }, []);

  const saveName = async () => {
<<<<<<< HEAD
    await AsyncStorage.setItem("name", name);
    alert("Nama berhasil disimpan!");
=======
    await AsyncStorage.setItem('name', name);
    alert('Nama berhasil disimpan!');
>>>>>>> 588ae75db124f2314e1380ef229ce0e88efab5e2
  };

  const logout = async () => {
    await AsyncStorage.clear();
<<<<<<< HEAD
    router.replace("/");
=======
    router.replace('/');
>>>>>>> 588ae75db124f2314e1380ef229ce0e88efab5e2
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
<<<<<<< HEAD
=======
      
>>>>>>> 588ae75db124f2314e1380ef229ce0e88efab5e2
      <View className="bg-blue-600 py-10 rounded-b-3xl items-center">
        <MaterialCommunityIcons name="account-circle" size={90} color="white" />
        <Text className="text-white text-2xl font-bold mt-4">
          {name ? name : "Pengguna"}
        </Text>
        <Text className="text-blue-200 mt-1">Status: Aktif</Text>
      </View>

      <View className="bg-white p-5 mx-4 mt-5 rounded-2xl shadow">
        <Text className="font-semibold mb-2">Nama Pengguna:</Text>
        <View className="flex-row items-center">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama"
            className="flex-1 border border-gray-300 px-3 py-2 rounded-lg"
          />
          <TouchableOpacity
            onPress={saveName}
            className="bg-green-500 px-4 py-2 ml-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white p-5 mx-4 mt-4 rounded-2xl shadow">
        <Text className="font-semibold">ID Pengguna (UserID):</Text>
        <Text className="text-blue-700 font-bold mt-1">
          {userID ? userID : "- Belum ada UserID -"}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Gunakan ID ini untuk identifikasi.
        </Text>
      </View>

      <TouchableOpacity
        onPress={logout}
        className="bg-red-600 mx-4 mt-6 mb-10 py-3 rounded-2xl"
      >
        <Text className="text-center text-white font-bold text-lg">
          Keluar (Logout)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
