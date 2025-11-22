import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function createNewUser(userData) {
    const url = "http://localhost:8000/api/user"; // Ganti dengan URL endpoint API Anda

    try {
      const response = await fetch(url, {
        method: "POST", // Metode HTTP
        headers: {
          "Content-Type": "application/json", // Memberi tahu server format data yang dikirim
        },
        body: JSON.stringify(userData), // Mengubah objek JavaScript menjadi string JSON
      });

      // Periksa jika permintaan berhasil (status 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Menguraikan respons JSON dari server
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error); // Menangani kesalahan jaringan atau kesalahan status HTTP
    }
  }

  const submitPost = async () => {
    if (!nama || !email || !password) {
      Alert.alert("Error", "PSilakan masukan Nama dan Email.");
      return;
    }

    setIsLoading(true);
    const postData = {
      nama: nama,
      email: email,
      password: password, // Example user ID
      password_confirmation: passwordConfirmation,
    };
    try {
      // Panggil createNewUser dan tunggu hasilnya
      const result = await createNewUser(postData);

      if (result) {
        // Jika berhasil, tampilkan alert sukses dan navigasi/reset
        Alert.alert("Success", `Akun berhasil dibuat untuk ${result.nama}!`);
        router.push("/"); // Contoh: navigasi kembali ke halaman login
      } else {
        // Jika result null/undefined (karena error internal di createNewUser ditangkap tapi tidak dilempar ulang)
        Alert.alert(
          "Error",
          "Terjadi kesalahan saat registrasi. Mohon coba lagi."
        );
      }
    } catch (error) {
      // Tangkap error yang mungkin dilempar dari createNewUser jika dimodifikasi
      console.error("Error di submitPost:", error);
      Alert.alert(
        "Error",
        "Gagal membuat akun. Pastikan server berjalan dan koneksi internet stabil."
      );
    } finally {
      setIsLoading(false); // Pastikan loading berhenti
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* ===== HEADER ===== */}
        <LinearGradient
          colors={["#4CC9F0", "#1565C0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_React.svg",
              }}
              style={styles.logo}
            />
            <Link href="/" asChild>
              <TouchableOpacity>
                <Ionicons name="close" size={22} color="#fff" />
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.textAyo}>Ayo</Text>
          <Text style={styles.textTitle}>Buat Akun Baru Kamu !!</Text>
        </LinearGradient>

        {/* ===== FORM ===== */}
        <View style={styles.outerContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={18}
                color="#4E4E4E"
                style={styles.icon}
              />
              <TextInput
                placeholder="Nama Lengkap"
                style={styles.input}
                value={nama}
                onChangeText={setNama}
              />
            </View>

            <View style={styles.inputWrapper}>
              <MaterialIcons
                name="email"
                size={18}
                color="#4E4E4E"
                style={styles.icon}
              />
              <TextInput
                placeholder="Alamat Email"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="#4E4E4E"
                style={styles.icon}
              />
              <TextInput
                placeholder="Kata Sandi"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="#4E4E4E"
                style={styles.icon}
              />
              <TextInput
                placeholder="Ketik Ulang Kata Sandi"
                style={styles.input}
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox value={isChecked} onValueChange={setIsChecked} />
              <Text style={styles.checkboxText}>
                Saya Setuju Dengan{" "}
                <Text style={styles.linkText}>Syarat & Privasi</Text>
              </Text>
            </View>
          </View>

          {/* ===== BUTTON ===== */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={submitPost} disabled={!isChecked}>
              <LinearGradient
                colors={
                  isChecked ? ["#4CC9F0", "#1565C0"] : ["#B0BEC5", "#90A4AE"]
                }
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Daftar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ===== FOOTER ===== */}
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text style={styles.footerText}>
                Sudah Punya Akun? <Text style={styles.linkText}>Masuk</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  header: {
    height: 250,
    paddingHorizontal: 25,
    paddingTop: 80,
    borderBottomRightRadius: 80,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  logo: { width: 55, height: 55, borderRadius: 12 },
  textAyo: { color: "#fff", fontSize: 22, fontWeight: "300" },
  textTitle: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  outerContainer: { alignItems: "center", marginTop: -20 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: "90%",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#004D40",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 45,
    width: "100%",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: "#333" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 10,
    width: "100%",
  },
  checkboxText: {
    fontSize: 13,
    color: "#333",
    marginLeft: 6,
    textAlign: "center",
  },
  linkText: { color: "#0D47A1", fontWeight: "bold" },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  buttonGradient: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    color: "#333",
  },
});
