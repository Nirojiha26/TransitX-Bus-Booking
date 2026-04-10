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
import {
  validateEmail,
  validatePhone,
  validateUsername,
} from '../utils/validation';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const ROLES: { label: string; value: 'passenger' | 'driver' | 'travel' }[] = [
  { label: 'Passenger', value: 'passenger' },
  { label: 'Driver', value: 'driver' },
  { label: 'Travel Agency', value: 'travel' },
];

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'passenger' | 'driver' | 'travel' | ''>('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Focus tracking state
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const selectedRoleLabel =
    ROLES.find(r => r.value === role)?.label ?? '';

  const handleRegister = async () => {
    if (!validateUsername(username)) {
      return Alert.alert('Error', 'Name must be at least 3 characters');
    }
    if (!validatePhone(phone)) {
      return Alert.alert('Error', 'Phone must be 9–10 digits');
    }
    if (!validateEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email');
    }
    if (!role) {
      return Alert.alert('Error', 'Please select your role');
    }

    setLoading(true);
    try {
      await authService.register(username, phone, email, role as any);
      Alert.alert('Success', `OTP sent! Registered as ${role}`);
      navigation.navigate('VerifyOTP', { phone });
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong');
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

      {/* ════════════ Role Dropdown Modal ════════════ */}
      <Modal
        visible={roleDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRoleDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setRoleDropdownOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <Text style={styles.dropdownTitle}>Select your Role</Text>
            <FlatList
              data={ROLES}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    item.value === role && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setRole(item.value);
                    setRoleDropdownOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      item.value === role && styles.dropdownItemTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === role && (
                    <MaterialIcons name="check-circle" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ════════════ Full orange background ════════════ */}
      <View style={styles.orangeScreen}>

        {/* ── Top orange area: icon + title ── */}
        <View style={styles.topSection}>
          <View style={styles.blobTL} />
          <View style={styles.blobBR} />

          <View style={styles.checkOuter}>
            <View style={styles.checkInner}>
              <MaterialIcons name="person-add" size={32} color={Colors.primary} />
            </View>
          </View>
          <Text style={styles.pageTitle}>TRANSITX</Text>
        </View>

        {/* ── White bottom sheet (fills rest of screen) ── */}
        <View style={styles.whiteSheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sheetScroll}
          >
            <View style={styles.sheetInner}>
              <View style={styles.contentGroup}>
                <Text style={styles.welcomeHeading}>Create Account</Text>
                <Text style={styles.subtitle}>Fill in your details to get started</Text>
                {/* Full Name */}
                <View style={getPillStyle('username')}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="person" 
                      size={22} 
                      color={focusedField === 'username' ? Colors.primary : '#AAAAAA'} 
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your name"
                    placeholderTextColor="#BBBBBB"
                    value={username}
                    onChangeText={setUsername}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    returnKeyType="next"
                  />
                </View>

                {/* Phone Number */}
                <View style={getPillStyle('phone')}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="phone" 
                      size={22} 
                      color={focusedField === 'phone' ? Colors.primary : '#AAAAAA'} 
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#BBBBBB"
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="phone-pad"
                    maxLength={10}
                    returnKeyType="next"
                  />
                </View>

                {/* Email */}
                <View style={getPillStyle('email')}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="email" 
                      size={22} 
                      color={focusedField === 'email' ? Colors.primary : '#AAAAAA'} 
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#BBBBBB"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                  />
                </View>

                {/* Role dropdown pill */}
                <TouchableOpacity
                  style={[styles.inputPill, roleDropdownOpen && styles.inputPillFocused]}
                  activeOpacity={0.7}
                  onPress={() => setRoleDropdownOpen(true)}
                >
                  <View style={styles.iconWrap}>
                    <MaterialIcons 
                      name="group" 
                      size={22} 
                      color={role ? Colors.primary : '#AAAAAA'} 
                    />
                  </View>
                  <Text
                    style={[
                      styles.pillInput,
                      { color: selectedRoleLabel ? '#333333' : '#BBBBBB' },
                    ]}
                  >
                    {selectedRoleLabel || 'Select your Role'}
                  </Text>
                  <MaterialIcons name="keyboard-arrow-down" size={22} color="#AAAAAA" />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={[styles.signUpButton, loading && { opacity: 0.75 }]}
                  onPress={handleRegister}
                  activeOpacity={0.85}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.signUpText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  style={styles.signInRow}
                >
                  <Text style={styles.signInText}>
                    Already A Member?{' '}
                    <Text style={styles.signInLink}>Sign in</Text>
                  </Text>
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
  root: {
    flex: 1,
  },

  orangeScreen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  topSection: {
    height: hp(32),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp(4),
  },

  blobTL: {
    position: 'absolute',
    top: -30,
    left: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  blobBR: {
    position: 'absolute',
    bottom: -20,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },

  checkOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(255,255,255,0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: fs(22),
    fontWeight: '900',
    letterSpacing: 4,
  },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -hp(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  sheetScroll: {
    flexGrow: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(4),
    paddingBottom: hp(3),
  },
  sheetInner: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: hp(4),
  },

  contentGroup: {
    marginTop: hp(2),
  },
  welcomeHeading: {
    fontSize: fs(24),
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: fs(15),
    color: '#777',
    textAlign: 'center',
    marginBottom: hp(4),
  },

  inputPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 32,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  inputPillFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.1,
    elevation: 4,
  },
  iconWrap: {
    width: 30,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillInput: {
    flex: 1,
    fontSize: fs(15),
    color: '#333333',
    padding: 0,
  },

  bottomActions: {
    marginTop: hp(2),
  },

  signUpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: hp(2),
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    width: '100%', // Match overall width pattern
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  signInRow: {
    marginTop: hp(2),
    alignItems: 'center',
  },
  signInText: {
    fontSize: fs(16),
    color: '#666666',
  },
  signInLink: {
    color: Colors.primary,
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    width: wp(80),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 16,
  },
  dropdownTitle: {
    fontSize: fs(13),
    color: '#AAAAAA',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  dropdownItemActive: {
    backgroundColor: '#FFF5F0',
  },
  dropdownItemText: {
    flex: 1,
    fontSize: fs(16),
    color: '#333333',
  },
  dropdownItemTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default RegisterScreen;

