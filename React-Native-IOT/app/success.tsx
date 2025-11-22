import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#DFF8E9", "#C7F3FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Ilustrasi awan lucu */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/images/agri-iot.jpeg")} // disesuaikan dengan struktur kamu
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Teks utama */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>SUKSES MENDAFTAR</Text>
        <Text style={styles.subtitle}>Selamat Datang di Komunitas Kami</Text>
      </View>

      {/* Tombol Mulai Pantau */}
        <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/")} // arahkan ke halaman login (index.tsx)
        >
        <LinearGradient colors={["#FF9966", "#FF5E62"]} style={styles.button}>
            <Text style={styles.buttonText}>MULAI PANTAU!</Text>
        </LinearGradient>
        </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 250,
  },
  textWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A3C34",
    backgroundColor: "#BFFFD0",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginTop: 6,
  },
  buttonWrapper: {
    width: "65%",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#FF9966",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
});
