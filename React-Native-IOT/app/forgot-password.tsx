import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Peringatan", "Email tidak boleh kosong!");
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => {
        Alert.alert("Berhasil", "Link reset kata sandi telah dikirim ke email Anda.");
        setEmail("");
        setLoading(false);
      }, 1500);
    } catch (error) {
      Alert.alert("Error", "Tidak dapat terhubung ke server.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Ionicons name="leaf" size={20} color="#1A3A0F" />
        </View>
        <TouchableOpacity>
          <Ionicons name="close" size={26} color="#1A3A0F" />
        </TouchableOpacity>
      </View>

      {/* Atas: ikon & teks */}
      <View style={styles.topContent}>
        <Ionicons name="lock-closed" size={60} color="#1A3A0F" />
        <Text style={styles.title}>
          Lupa
        </Text>
        <Text style={styles.title}>
           <Text style={{ fontWeight: "600" }}>Kata Sandi?</Text>
        </Text>
        <Text style={styles.subtitle}>
          Jangan Cemas, Kami akan mengirimkan reset Kata Sandi ke email anda
        </Text>
      </View>

      {/* Bawah: gradasi full */}
      <LinearGradient
        colors={["#45D2F5", "#00417D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomCard}
      >
        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Masukan Email"
            placeholderTextColor="#D1E8FF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#00417D" size="small" />
          ) : (
            <Text style={styles.buttonText}>Setel Ulang Kata Sandi</Text>
          )}
        </TouchableOpacity>

        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={styles.backText}>Kembali Ke Halaman Login</Text>
          </TouchableOpacity>
        </Link>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  logoBox: {
    width: 35,
    height: 35,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  topContent: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#1A3A0F",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#1A3A0F",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
    width: "85%",
  },
  bottomCard: {
    flex: 1, // ini yang membuat gradasi sampai bawah layar
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 50,
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 25,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: "#fff", fontSize: 15 },
  button: {
    backgroundColor: "#A8D5BA",
    borderRadius: 25,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom : 100
  },
  buttonText: {
    color: "#1A3A0F",
    fontWeight: "bold",
    fontSize: 15,
  },
  backText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
