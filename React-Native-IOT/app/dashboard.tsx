import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const logData = [
  "[20:30:45] Mode Otomatis DIKUNCI. Target Suhu: 25°C.",
  "[20:30:43] Mode Otomatis DINONAKTIFKAN. Kontrol Manual Aktif.",
  "[20:30:42] Mode Otomatis DIKUNCI. Target Suhu: 25°C.",
  "[20:30:42] Mode Otomatis DINONAKTIFKAN. Kontrol Manual Aktif.",
  "[20:30:41] Mode Otomatis DIKUNCI. Target Suhu: 25°C.",
  "[20:30:40] Mode Otomatis DINONAKTIFKAN. Kontrol Manual Aktif.",
  "[20:30:39] Mode Otomatis DIKUNCI. Target Suhu: 25°C.",
  "[20:30:26] Kipas Ventilasi diatur ke: ON.",
  "[20:30:23] Peringatan: Suhu tinggi (30.0°C). Kipas mati.",
  "[20:30:08] Peringatan: Suhu tinggi (29.8°C). Kipas mati.",
  "[20:29:32] Peringatan: Suhu tinggi (30.0°C). Kipas mati.",
  "[20:29:23] Peringatan: Suhu tinggi (29.8°C). Kipas mati.",
  "[20:28:44] Peringatan: Suhu tinggi (29.8°C). Kipas mati.",
  "[20:28:41] Peringatan: Suhu tinggi (29.8°C). Kipas mati.",
];

// Dummy data untuk Tren TDS (waktu dan nilai)
const tdsData = [
  { time: "12:00", value: 900 },
  { time: "17:00", value: 920 },
  { time: "21:00", value: 890 },
  { time: "23:00", value: 940 },
  { time: "03:00", value: 980 },
  { time: "08:00", value: 1040 },
  { time: "11:00", value: 1150 },
];

export default function DashboardRiwayatScreen() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // State kontrol manual suhu dan lampu (sama seperti sebelumnya)
  const [suhuUdara, setSuhuUdara] = useState(true);
  const [kipasVentilasi, setKipasVentilasi] = useState(false);
  const [lampuGrowLight, setLampuGrowLight] = useState(true);
  const [kecepatanKipas, setKecepatanKipas] = useState(45);
  const router = useRouter();

  // State kontrol manual PH dan TDS
  const [phNaik, setPhNaik] = useState(true);
  const [phTurun, setPhTurun] = useState(false);
  const [nutrisiA, setNutrisiA] = useState(true);
  const [nutrisiB, setNutrisiB] = useState(false);

  // State input Mode Otomatis
  const [targetPH, setTargetPH] = useState("");
  const [targetTDS, setTargetTDS] = useState("");
  const [riwayat, setRiwayat] = useState([]);

  const onDisableAutomatic = () => {
    setTargetPH("");
    setTargetTDS("");
  };

  const handleLogout = () => {
    alert("Keluar dari akun");
    // Logika logout bisa ditambahkan di sini
    router.replace("/");
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const getDataRiwayat = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/riwayat/get", {
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData().then((res) => setUserData(res));
    getDataRiwayat().then((res) => setRiwayat(res.data));
  }, []);
  console.log(riwayat);

  const renderDashboard = () => (
    <ScrollView
      style={styles.contentScroll}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text style={{ fontWeight: "bold", fontSize: 12, color: "#444" }}>
            Logo
          </Text>
        </View>
        <Text style={styles.mainTitle}>Smart Greenhouse Dashboard</Text>
      </View>

      {/* Same Dashboard content here */}
      {/* Kondisi PH, TDS dan Suhu Air */}
      <View style={[styles.card, { borderColor: "#11cccc" }]}>
        <Text style={[styles.sectionTitle, { color: "#11cccc" }]}>
          Kondisi PH,TDS dan Suhu Air Saat Ini
        </Text>

        <View style={styles.infoRow}>
          <View style={[styles.infoLabel, { borderLeftColor: "#11cccc" }]}>
            <Text style={styles.infoLabelText}>Nilai Ph</Text>
          </View>
          <View style={styles.infoValueBox}>
            <Text style={styles.infoValue}>7</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={[styles.infoLabel, { borderLeftColor: "#fff200" }]}>
            <Text style={styles.infoLabelText}>Nilai TDS Sensor</Text>
          </View>
          <View style={styles.infoValueBox}>
            <Text style={styles.infoValue}>870 ppm</Text>
            <Text style={styles.icon}>💧</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={[styles.infoLabel, { borderLeftColor: "#fff200" }]}>
            <Text style={styles.infoLabelText}>Suhu Air</Text>
          </View>
          <View style={styles.infoValueBox}>
            <Text style={styles.infoValue}>30&#176;C</Text>
            <Text style={styles.icon}>🌡️</Text>
          </View>
        </View>
      </View>

      {/* Kondisi Udara */}
      <View style={[styles.card, { borderColor: "#56ce53" }]}>
        <Text style={[styles.sectionTitle, { color: "#56ce53" }]}>
          Kondisi Udara Saat Ini
        </Text>

        <View style={styles.infoRow}>
          <View style={[styles.infoLabel, { borderLeftColor: "#11cccc" }]}>
            <Text style={styles.infoLabelText}>Suhu Udara</Text>
          </View>
          <View style={styles.infoValueBox}>
            <Text style={styles.infoValue}>29.3&#176;C</Text>
            <Text style={styles.icon}>🌡️</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={[styles.infoLabel, { borderLeftColor: "#fff200" }]}>
            <Text style={styles.infoLabelText}>Kelembapan Udara</Text>
          </View>
          <View style={styles.infoValueBox}>
            <Text style={styles.infoValue}>76 %</Text>
            <Text style={styles.icon}>☁️</Text>
          </View>
        </View>
      </View>

      {/* Kontrol Manual Suhu dan Lampu */}
      <View style={[styles.card, { borderColor: "#56ce53" }]}>
        <Text style={[styles.sectionTitle, { color: "#f9d71c" }]}>
          Kontrol Manual Suhu dan Lampu
        </Text>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Suhu Udara</Text>
          <Switch value={suhuUdara} onValueChange={setSuhuUdara} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Kipas Ventilasi</Text>
          <Switch value={kipasVentilasi} onValueChange={setKipasVentilasi} />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Lampu Grow Light</Text>
          <Switch value={lampuGrowLight} onValueChange={setLampuGrowLight} />
        </View>

        <Text style={styles.sliderLabel}>Kecepatan Kipas (0 - 100%)</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={kecepatanKipas}
            minimumTrackTintColor="#f9d71c"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#f9d71c"
            onValueChange={setKecepatanKipas}
          />
          <Text style={{ width: 50, textAlign: "right", color: "#f9d71c" }}>
            {kecepatanKipas} %
          </Text>
        </View>
      </View>

      {/* Kontrol Manual PH dan TDS serta Mode Otomatis */}
      <View style={styles.row}>
        <View
          style={[
            styles.card,
            { borderColor: "#11cccc", flex: 1, marginRight: 8 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: "#f9d71c" }]}>
            Kontrol Manual PH dan TDS
          </Text>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>PH NAIK</Text>
            <Switch value={phNaik} onValueChange={setPhNaik} />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>PH TURUN</Text>
            <Switch value={phTurun} onValueChange={setPhTurun} />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>NUTRISI A</Text>
            <Switch value={nutrisiA} onValueChange={setNutrisiA} />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>NUTRISI B</Text>
            <Switch value={nutrisiB} onValueChange={setNutrisiB} />
          </View>
        </View>

        <View
          style={[
            styles.card,
            { borderColor: "#11cccc", flex: 1, marginLeft: 8 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: "#f9d71c" }]}>
            Mode Otomatis
          </Text>

          <Text style={styles.inputLabel}>Target PH [5.8 - 6.8]</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Target PH"
            placeholderTextColor="#888"
            value={targetPH}
            keyboardType="numeric"
            onChangeText={setTargetPH}
          />

          <Text style={styles.inputLabel}>Target TDS [800 - 1200]</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan Target TDS"
            placeholderTextColor="#888"
            value={targetTDS}
            keyboardType="numeric"
            onChangeText={setTargetTDS}
          />

          <TouchableOpacity
            style={styles.btnNonaktifkan}
            onPress={onDisableAutomatic}
          >
            <Text style={styles.btnText}>NONAKTIFKAN Otomatis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderRiwayat = () => (
    <ScrollView
      style={styles.contentScroll}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.riwayatTitle}>Riwayat Data & Informasi Akun</Text>

      {/* Box Log & Diagnostik */}
      <View style={[styles.logBox, { borderColor: "#39b54a" }]}>
        <Text style={styles.logTitle}>Log & Diagnostik Sistem</Text>
        <View style={styles.statusRow}>
          <Text style={{ color: "#39b54a", fontWeight: "bold" }}>
            Status Koneksi :
          </Text>
          <Text style={{ color: "#39b54a", fontWeight: "bold", marginLeft: 6 }}>
            Tersambung (Wi-Fi)
          </Text>
        </View>
        {/*<ScrollView style={styles.logContent}>
          {logData.map((item, index) => (
            <Text key={index} style={styles.logText}>
              {item}
            </Text>
          ))}
        </ScrollView>*/}
        <ScrollView style={styles.logContent}>
          {riwayat.map((item, index) => {
            const now = new Date(item.created_at);
            const format = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });
            const mode =
              item.mode_ph === "otomatis"
                ? "Mode Otomatis DIKUNCI"
                : "Mode Otomatis DINONAKTIFKAN";
            const ph = item.ph;
            const ppm = item.ppm;
            const suhu_air = item.suhu_air;
            const Kelembapan = item.kelembapan;
            const suhu_udara = item.suhu_udara;

            return (
              <Text key={index} style={styles.logText}>
                {format.format(now)} {mode} {"PH: " + ph},&nbsp;
                {"TDS: " + ppm + " ppm "},&nbsp;{"SUHU AIR:" + suhu_air + " C"}
                ,&nbsp;
                {"KELEMBAPAN:" + Kelembapan + " C"},&nbsp;
                {"SUHU UDARA:" + suhu_udara + " C"}
              </Text>
            );
          })}
        </ScrollView>
      </View>

      {/* Trend TDS */}
      <View style={[styles.trendBox, { borderColor: "#00b2fe" }]}>
        <Text style={styles.trendTitle}>Tren TDS (24 Jam Terakhir)</Text>

        {/* Simple line chart using View & Text placeholder */}
        <View style={styles.fakeChart}>
          {/* Y axis approximate marks */}
          <View style={styles.chartYAxis}>
            {[1200, 900, 600, 300, 0].map((val) => (
              <Text key={val} style={styles.yAxisText}>
                {val}
              </Text>
            ))}
          </View>
          {/* Chart line and points */}
          <View style={styles.chartLineWrapper}>
            <View style={styles.chartPointsRow}>
              {tdsData.map(({ time, value }, idx) => {
                // Calculate height in pixels based on value max 1200
                const maxHeight = 120;
                const height = (value / 1200) * maxHeight;
                return (
                  <View key={idx} style={{ alignItems: "center", flex: 1 }}>
                    <View style={[styles.chartPoint, { bottom: height }]} />
                    <Text style={styles.timeLabel}>{time}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.chartLine} />
          </View>
        </View>
      </View>

      {/* Informasi Akun */}
      <View style={[styles.accountBox, { borderColor: "#00b2fe" }]}>
        <Text style={styles.accountTitle}>Informasi Akun</Text>
        <View style={styles.accountInfoRow}>
          <Text style={styles.accountLabel}>Nama Akun</Text>
          <Text style={styles.accountValue}>: {userData?.nama}</Text>
        </View>
        <View style={styles.accountInfoRow}>
          <Text style={styles.accountLabel}>Peran</Text>
          <Text style={styles.accountValue}>: Pengguna</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1 }}>
      {activeTab === "dashboard" ? renderDashboard() : renderRiwayat()}

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={
            activeTab === "dashboard" ? styles.navItemSelected : styles.navItem
          }
          onPress={() => setActiveTab("dashboard")}
        >
          <Text
            style={
              activeTab === "dashboard"
                ? styles.navIconSelected
                : styles.navIcon
            }
          >
            🏠
          </Text>
          <Text
            style={
              activeTab === "dashboard"
                ? styles.navTextSelected
                : styles.navText
            }
          >
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            activeTab === "riwayat" ? styles.navItemSelected : styles.navItem
          }
          onPress={() => setActiveTab("riwayat")}
        >
          <Text
            style={
              activeTab === "riwayat" ? styles.navIconSelected : styles.navIcon
            }
          >
            📜
          </Text>
          <Text
            style={
              activeTab === "riwayat" ? styles.navTextSelected : styles.navText
            }
          >
            Riwayat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },

  logoContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#d1e7f0",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#eee",
  },

  card: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 3,
    flexDirection: "column",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  infoLabel: {
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    flex: 2,
    borderRadius: 6,
  },
  infoLabelText: {
    color: "#ddd",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoValueBox: {
    backgroundColor: "#111",
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  infoValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    alignItems: "center",
  },
  controlLabel: {
    color: "#bbb",
    fontWeight: "bold",
    fontSize: 14,
  },
  sliderLabel: {
    color: "#bbb",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  inputLabel: {
    color: "#bbb",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 3,
  },
  input: {
    backgroundColor: "#111",
    borderRadius: 6,
    color: "#fff",
    paddingHorizontal: 8,
    height: 38,
    borderWidth: 1,
    borderColor: "#444",
  },
  btnNonaktifkan: {
    marginTop: 20,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    marginBottom: 25,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#444",
    backgroundColor: "#111",
    marginBottom: 50,
  },
  navItem: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  navItemSelected: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  navIcon: {
    color: "#999",
    fontSize: 20,
  },
  navIconSelected: {
    color: "#f9d71c",
    fontSize: 24,
  },
  navText: {
    color: "#999",
    fontSize: 12,
  },
  navTextSelected: {
    color: "#f9d71c",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Riwayat styles
  riwayatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  logBox: {
    backgroundColor: "#555",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
  },
  logTitle: {
    color: "#39b54a",
    fontWeight: "bold",
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  logContent: {
    backgroundColor: "#333",
    borderRadius: 10,
    height: 140,
    padding: 6,
  },
  logText: {
    color: "#eee",
    fontSize: 11,
    marginBottom: 4,
    fontFamily: "monospace",
  },

  trendBox: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    borderWidth: 2,
  },
  trendTitle: {
    color: "#00b2fe",
    fontWeight: "bold",
    marginBottom: 8,
  },

  fakeChart: {
    flexDirection: "row",
    height: 140,
    paddingHorizontal: 9,
    marginTop: 12,
  },
  chartYAxis: {
    width: 30,
    justifyContent: "space-between",
  },
  yAxisText: {
    color: "#888",
    fontSize: 10,
  },
  chartLineWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chartPointsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 120,
  },
  chartPoint: {
    width: 8,
    height: 8,
    backgroundColor: "#00b2fe",
    borderRadius: 4,
    position: "relative",
  },
  timeLabel: {
    color: "#00b2fe",
    fontSize: 10,
    marginTop: 2,
  },
  chartLine: {
    position: "absolute",
    left: 30,
    right: 0,
    bottom: 30,
    height: 2,
    backgroundColor: "#00b2fe",
  },

  accountBox: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 15,
    borderWidth: 3,
    alignItems: "center",
  },
  accountTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#f9d71c",
    marginBottom: 12,
  },
  accountInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  accountLabel: {
    fontWeight: "bold",
    color: "#eee",
    width: 90,
  },
  accountValue: {
    color: "#eee",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 12,
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  contentScroll: {
    flex: 1,
  },
});
