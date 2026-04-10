import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { authService } from '../services/authService';
import { validatePhone } from '../utils/validation';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleLogin = async () => {
    console.log('🚀 [LoginScreen] Attempting login for:', phone);
    if (!validatePhone(phone)) {
      return Alert.alert('Invalid Phone', 'Please enter a valid 9 or 10 digit number.');
    }

    setLoading(true);
    try {
      await authService.sendOtp(phone);
      console.log('✅ [LoginScreen] OTP Sent');
      navigation.navigate('VerifyOTP', { phone });
    } catch (error: any) {
      console.error('❌ [LoginScreen] Login Error:', error);
      if (error.status === 404 || error.message?.includes('not found')) {
        Alert.alert('Account Not Found', 'This number is not registered.', [
          { text: 'Cancel' },
          { text: 'Register', onPress: () => navigation.navigate('Register') },
        ]);
      } else {
        Alert.alert('Login Error', error.message || 'Check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <View style={styles.orangeScreen}>
        {/* --- Top Section: Smaller height to reduce gap --- */}
        <View style={styles.topSection}>
          <View style={styles.blobTL} />
          <View style={styles.blobBR} />

          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <MaterialIcons name="login" size={32} color={Colors.primary} />
            </View>
          </View>
          <Text style={styles.pageTitle}>TRANSITX</Text>
        </View>

        {/* --- White Sheet: Negative margin creates the overlap --- */}
        <View style={styles.whiteSheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sheetScroll}
          >
            <View style={styles.sheetInner}>
              <View style={styles.contentGroup}>
                <Text style={styles.welcomeHeading}>Welcome Back</Text>
                <Text style={styles.subtitle}>Enter your phone number to log in</Text>

                <View style={[styles.inputPill, isFocused && styles.inputPillFocused]}>
                  <View style={styles.iconWrap}>
                    <MaterialIcons
                      name="phone"
                      size={22}
                      color={isFocused ? Colors.primary : '#AAAAAA'}
                    />
                  </View>
                  <TextInput
                    style={styles.pillInput}
                    placeholder="7xxxxxxxx"
                    placeholderTextColor="#BBBBBB"
                    value={phone}
                    onChangeText={setPhone}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    keyboardType="phone-pad"
                    maxLength={10}
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={[styles.primaryButton, loading && { opacity: 0.75 }]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.primaryText}>Send OTP</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.switchRow}>
                  <Text style={styles.switchText}>
                    New to TransitX? <Text style={styles.switchLink}>Register</Text>
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
  root: { flex: 1 },
  orangeScreen: { flex: 1, backgroundColor: Colors.primary },
  
  topSection: {
    height: hp(32), // Reduced height
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp(4), // Extra padding to ensure icon looks centered in the orange
  },

  blobTL: { position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.15)' },
  blobBR: { position: 'absolute', bottom: 20, right: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.12)' },

  iconOuter: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.28)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  iconInner: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  
  pageTitle: { color: '#FFFFFF', fontSize: fs(22), fontWeight: '900', letterSpacing: 4 },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -hp(5), // THIS IS THE FIX: Overlaps the orange section
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  
  sheetScroll: { flexGrow: 1, paddingHorizontal: wp(8), paddingTop: hp(5) },
  sheetInner: { flex: 1, justifyContent: 'space-between', paddingBottom: hp(4) },

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
  subtitle: { fontSize: fs(15), color: '#777', textAlign: 'center', marginBottom: hp(4) },

  inputPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  inputPillFocused: { borderColor: Colors.primary, backgroundColor: '#FFF' },
  iconWrap: { marginRight: 12 },
  pillInput: { flex: 1, fontSize: fs(16), color: '#333' },

  bottomActions: { marginTop: hp(4) },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: hp(2),
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryText: { color: '#FFFFFF', fontSize: fs(18), fontWeight: 'bold' },
  switchRow: { marginTop: hp(2.5), alignItems: 'center', paddingBottom: hp(4) },
  switchText: { fontSize: fs(16), color: '#666' },
  switchLink: { color: Colors.primary, fontWeight: 'bold' },
});

export default LoginScreen;