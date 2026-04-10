import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ── Visual Section (Top 55%) ── */}
      <View style={styles.imageContainer}>
        {/* Subtle orange background blobs for visual depth behind the image */}
        <View style={styles.blob1} />
        <View style={styles.blob2} />

        <Image
          source={require('../assets/images/onboarding.png')}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      </View>

      {/* ── Text & Action Section (Bottom 45%) ── */}
      <View style={styles.contentContainer}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Welcome to TransitX</Text>
          <Text style={styles.description}>
            Your effortless solution for reliable, fast, and comfortable bus
            bookings. Hop on and explore the world with us!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.replace('Register')}
        >
          <Text style={styles.primaryText}>Get Started</Text>
          <View style={styles.btnIconCircle}>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* ── Image Display Area ── */
  imageContainer: {
    height: hp(52),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  onboardingImage: {
    width: wp(85),
    height: '80%',
    zIndex: 2,
  },

  // Abstract background shapes
  blob1: {
    position: 'absolute',
    top: '10%',
    right: -wp(10),
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    backgroundColor: Colors.primary,
    opacity: 0.05,
    zIndex: 1,
  },
  blob2: {
    position: 'absolute',
    bottom: '0%',
    left: -wp(12),
    width: wp(60),
    height: wp(60),
    borderRadius: wp(30),
    backgroundColor: Colors.primary,
    opacity: 0.08,
    zIndex: 1,
  },

  /* ── Text & Actions Area ── */
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(8),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: hp(4),
  },
  textWrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: fs(28),
    fontWeight: '900',
    color: '#1A1A1A',
    marginBottom: hp(2),
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: fs(16),
    color: '#666666',
    textAlign: 'center',
    lineHeight: fs(24),
    paddingHorizontal: wp(2),
  },

  /* ── Centered Primary CTA ── */
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    borderRadius: 35,
    paddingVertical: hp(1.5),
    paddingLeft: wp(10),
    paddingRight: wp(2),
    minWidth: wp(70),
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  btnIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;

