import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { authService } from '../services/authService';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const BUS_TYPES = [
  { label: 'Luxury', value: 'luxury' },
  { label: 'Semi-Luxury', value: 'semi-luxury' },
  { label: 'Normal', value: 'normal' },
];

const SEAT_TYPES = [
  { label: '49 Seats', value: '49' },
  { label: '40 Seats', value: '40' },
  { label: '29 Seats', value: '29' },
  { label: '14 Seats', value: '14' },
];

const BusDetailsScreen = ({ navigation }: any) => {
  const [busName, setBusName] = useState('');
  const [busNo, setBusNo] = useState('');
  const [busType, setBusType] = useState('');
  const [seatType, setSeatType] = useState('');
  
  const [busTypeModalOpen, setBusTypeModalOpen] = useState(false);
  const [seatTypeModalOpen, setSeatTypeModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const selectedBusTypeLabel = BUS_TYPES.find(t => t.value === busType)?.label ?? '';
  const selectedSeatTypeLabel = SEAT_TYPES.find(s => s.value === seatType)?.label ?? '';

  const handleFinish = async () => {
    if (!busName.trim()) return Alert.alert('Error', 'Please enter bus name');
    if (!busNo.trim()) return Alert.alert('Error', 'Please enter bus number');
    if (!busType) return Alert.alert('Error', 'Please select bus type');
    if (!seatType) return Alert.alert('Error', 'Please select seat type');

    setLoading(true);
    try {
      await authService.saveBusDetails({
        busName,
        busNo,
        busType,
        seatType,
      });
      Alert.alert('Success', 'Profile setup complete!');
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save details');
    } finally {
      setLoading(false);
    }
  };

  const getPillStyle = (field: string) => [
    styles.inputPill,
    focusedField === field && styles.inputPillFocused,
  ];

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* --- Bus Type Modal --- */}
      <Modal
        visible={busTypeModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setBusTypeModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setBusTypeModalOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select Bus Type</Text>
            <FlatList
              data={BUS_TYPES}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dropdownItem, item.value === busType && styles.dropdownItemActive]}
                  onPress={() => {
                    setBusType(item.value);
                    setBusTypeModalOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, item.value === busType && styles.dropdownItemTextActive]}>
                    {item.label}
                  </Text>
                  {item.value === busType && (
                    <MaterialIcons name="check-circle" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* --- Seat Type Modal --- */}
      <Modal
        visible={seatTypeModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setSeatTypeModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSeatTypeModalOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select Seat Count</Text>
            <FlatList
              data={SEAT_TYPES}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dropdownItem, item.value === seatType && styles.dropdownItemActive]}
                  onPress={() => {
                    setSeatType(item.value);
                    setSeatTypeModalOpen(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, item.value === seatType && styles.dropdownItemTextActive]}>
                    {item.label}
                  </Text>
                  {item.value === seatType && (
                    <MaterialIcons name="check-circle" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.orangeScreen}>
        <View style={styles.topSection}>
          <View style={styles.blobTL} />
          <View style={styles.blobBR} />
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <MaterialIcons name="directions-bus" size={34} color={Colors.primary} />
            </View>
          </View>
          <Text style={styles.pageTitle}>BUS DETAILS</Text>
        </View>

        <View style={styles.whiteSheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sheetScroll}
          >
            <View style={styles.sheetInner}>
              <View style={styles.contentGroup}>
                <Text style={styles.heading}>One Last Step</Text>
                <Text style={styles.subtitle}>Please provide your bus information</Text>

                {/* Bus Name */}
                <View style={getPillStyle('busName')}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="label" 
                      size={20} 
                      color={focusedField === 'busName' ? Colors.primary : '#AAA'} 
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="Bus Name (e.g. TransitX Express)"
                    placeholderTextColor="#BBB"
                    value={busName}
                    onChangeText={setBusName}
                    onFocus={() => setFocusedField('busName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>

                {/* Bus Number */}
                <View style={getPillStyle('busNo')}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="numbers" 
                      size={20} 
                      color={focusedField === 'busNo' ? Colors.primary : '#AAA'} 
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="Bus Number (e.g. WP-NB-1234)"
                    placeholderTextColor="#BBB"
                    value={busNo}
                    onChangeText={setBusNo}
                    onFocus={() => setFocusedField('busNo')}
                    onBlur={() => setFocusedField(null)}
                    autoCapitalize="characters"
                  />
                </View>

                {/* Bus Type */}
                <TouchableOpacity
                  style={[styles.inputPill, busTypeModalOpen && styles.inputPillFocused]}
                  onPress={() => setBusTypeModalOpen(true)}
                >
                  <View style={styles.iconWrap}>
                    <MaterialIcons name="style" size={20} color={busType ? Colors.primary : '#AAA'} />
                  </View>
                  <Text style={[styles.pillInput, { color: busType ? '#333' : '#BBB' }]}>
                    {selectedBusTypeLabel || 'Select Bus Type'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={22} color="#AAA" />
                </TouchableOpacity>

                {/* Seat Type */}
                <TouchableOpacity
                  style={[styles.inputPill, seatTypeModalOpen && styles.inputPillFocused]}
                  onPress={() => setSeatTypeModalOpen(true)}
                >
                  <View style={styles.iconWrap}>
                    <MaterialIcons name="airline-seat-recline-normal" size={20} color={seatType ? Colors.primary : '#AAA'} />
                  </View>
                  <Text style={[styles.pillInput, { color: seatType ? '#333' : '#BBB' }]}>
                    {selectedSeatTypeLabel || 'Select Seat Count'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={22} color="#AAA" />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                  onPress={handleFinish}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <Text style={styles.primaryText}>Complete Setup</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  orangeScreen: { flex: 1, backgroundColor: Colors.primary },
  topSection: { height: hp(30), alignItems: 'center', justifyContent: 'center', paddingBottom: hp(2) },
  blobTL: { position: 'absolute', top: -30, left: -30, width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(255,255,255,0.15)' },
  blobBR: { position: 'absolute', bottom: -20, right: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.12)' },
  iconOuter: { width: 78, height: 78, borderRadius: 39, backgroundColor: 'rgba(255,255,255,0.28)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  pageTitle: { color: '#FFF', fontSize: fs(24), fontWeight: '900', letterSpacing: 3 },
  whiteSheet: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 35, borderTopRightRadius: 35, marginTop: -hp(5), elevation: 20 },
  sheetScroll: { flexGrow: 1, paddingHorizontal: wp(8), paddingTop: hp(5) },
  sheetInner: { flex: 1, justifyContent: 'space-between', paddingBottom: hp(4) },
  contentGroup: { marginTop: hp(1) },
  heading: { fontSize: fs(24), fontWeight: '900', color: '#333', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: fs(15), color: '#777', textAlign: 'center', marginBottom: hp(4) },
  inputPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 30, paddingVertical: hp(1.5), paddingHorizontal: wp(5), marginBottom: 16, borderWidth: 1.5, borderColor: 'transparent' },
  inputPillFocused: { borderColor: Colors.primary, backgroundColor: '#FFF', elevation: 2 },
  iconWrap: { width: 30, marginRight: 12, alignItems: 'center' },
  pillInput: { flex: 1, fontSize: fs(15), color: '#333' },
  bottomActions: { marginTop: hp(4) },
  primaryButton: { backgroundColor: Colors.primary, borderRadius: 15, paddingVertical: hp(2), alignItems: 'center', elevation: 5 },
  primaryText: { color: '#FFF', fontSize: fs(18), fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  dropdownModal: { width: wp(85), backgroundColor: '#FFF', borderRadius: 20, paddingVertical: 10, elevation: 10 },
  dropdownTitle: { fontSize: fs(14), color: '#AAA', fontWeight: '600', paddingHorizontal: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EEE', marginBottom: 5 },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  dropdownItemActive: { backgroundColor: '#FFF5F0' },
  dropdownItemText: { flex: 1, fontSize: fs(16), color: '#333' },
  dropdownItemTextActive: { color: Colors.primary, fontWeight: '700' },
});

export default BusDetailsScreen;
