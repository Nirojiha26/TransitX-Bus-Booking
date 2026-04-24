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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const VerifyOTPScreen = ({ route, navigation }: any) => {
  const { phone } = route.params;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleVerify = async () => {
    const trimmedCode = code.trim();
    if (trimmedCode.length < 5) {
      return Alert.alert(
        'Invalid Code',
        'Please enter the full 5 or 6 digit verification code.',
      );
    }

    setLoading(true);
    try {
      const data = await authService.verifyOtp(phone, trimmedCode);
      const { token, role } = data;

      if (token) {
        await AsyncStorage.setItem('userToken', token);
        if (role) {
          await AsyncStorage.setItem('userRole', role);
        }

        Alert.alert('Success', 'Logged in successfully!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('🎯 [VerifyOTP] Navigating for role:', role);
              // Since all details (including Bus Details for drivers) are now handled 
              // during registration, everyone can go straight to Home.
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            },
          },
        ]);
      } else {
        // Fallback if token is missing but no error was thrown
        Alert.alert('Login Success', 'Redirecting to Home...', [
          { text: 'OK', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }
        ]);
      }
    } catch (error: any) {
      const errorData = error.response?.data;
      Alert.alert(
        'Verification Failed',
        errorData?.message || 'Invalid code. Please try again.',
      );
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

      {/* ════════════ Full orange background ════════════ */}
      <View style={styles.orangeScreen}>
        {/* ── Top orange area: icon + title ── */}
        <View style={styles.topSection}>
          <View style={styles.blobTL} />
          <View style={styles.blobBR} />

          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <MaterialIcons
                name="verified-user"
                size={34}
                color={Colors.primary}
              />
            </View>
          </View>
          <Text style={styles.pageTitle}>VERIFICATION</Text>
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
                <Text style={styles.welcomeHeading}>Verification</Text>
                <Text style={styles.subtitle}>
                  We have sent the code to{'\n'}
                  <Text style={styles.boldPhone}>{phone}</Text>
                </Text>

                {/* OTP Input Container */}
                <View style={[styles.otpOuter, isFocused && styles.otpOuterFocused]}>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="000000"
                    placeholderTextColor="#BBBBBB"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={code}
                    onChangeText={setCode}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoFocus={true}
                    editable={!loading}
                  />
                </View>
              </View>

              {/* ── Bottom: button + resend link ── */}
              <View style={styles.bottomActions}>
                <TouchableOpacity
                  style={[styles.primaryButton, loading && { opacity: 0.75 }]}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.primaryText}>Submit</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.switchRow}
                >
                  <Text style={styles.switchText}>
                    Didn't receive the code?{' '}
                    <Text style={styles.switchLink}>Resend</Text>
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

  iconOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: 'rgba(255,255,255,0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: fs(24),
    fontWeight: '900',
    letterSpacing: 3,
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
    paddingHorizontal: wp(8),
    paddingTop: hp(5),
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
  boldPhone: {
    fontWeight: '700',
    color: Colors.primary,
    fontSize: fs(17),
  },

  otpOuter: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    paddingVertical: hp(1.8),
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    width: '100%',
  },
  otpOuterFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
  },
  otpInput: {
    width: '100%',
    textAlign: 'center',
    fontSize: fs(26),
    fontWeight: '900',
    letterSpacing: 10,
    color: '#333',
    padding: 0,
  },

  bottomActions: {
    marginTop: hp(2),
  },

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

  switchRow: {
    marginTop: hp(2),
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchText: {
    fontSize: fs(14),
    color: '#666666',
  },
  switchLink: {
    color: Colors.primary,
    fontWeight: '700',
  },
});

export default VerifyOTPScreen;