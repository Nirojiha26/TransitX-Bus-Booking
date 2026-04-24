import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { wp, hp, fs } from '../utils/responsive';

const MOCK_BUSES = [
  { id: '1', name: 'Express 101', number: 'NB-1234', type: 'Luxury', status: 'Active' },
  { id: '2', name: 'City Link', number: 'NB-5678', type: 'Normal', status: 'Pending' },
];

const ClassifyBusScreen = ({ navigation }: any) => {
  const renderBusItem = ({ item }: { item: typeof MOCK_BUSES[0] }) => (
    <View style={styles.busCard}>
      <View style={styles.busIconContainer}>
        <MaterialIcons name="directions-bus" size={24} color={Colors.primary} />
      </View>
      <View style={styles.busDetails}>
        <Text style={styles.busName}>{item.name}</Text>
        <Text style={styles.busNumber}>{item.number} • {item.type}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'Active' ? styles.statusActive : styles.statusPending]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* ── Top Section ── */}
      <View style={styles.topSection}>
        <View style={styles.blobTL} />
        <View style={styles.blobBR} />
        
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.iconOuter}>
          <View style={styles.iconInner}>
            <MaterialIcons name="admin-panel-settings" size={34} color={Colors.primary} />
          </View>
        </View>
        <Text style={styles.pageTitle}>CLASSIFY BUS</Text>
      </View>

      {/* ── White Sheet ── */}
      <View style={styles.whiteSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.heading}>Fleet Management</Text>
          <Text style={styles.subtitle}>Manage and classify your bus fleet</Text>
        </View>

        <FlatList
          data={MOCK_BUSES}
          renderItem={renderBusItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inventory" size={60} color="#EEE" />
              <Text style={styles.emptyText}>No buses added yet</Text>
            </View>
          }
        />

        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('BusDetails')}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.primaryText}>Add New Bus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topSection: {
    height: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp(2),
  },
  backButton: {
    position: 'absolute',
    top: hp(6),
    left: wp(6),
    padding: 8,
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
    marginBottom: 12,
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
    marginTop: -hp(4),
    paddingTop: hp(4),
  },
  sheetHeader: {
    paddingHorizontal: wp(8),
    marginBottom: hp(2),
  },
  heading: {
    fontSize: fs(22),
    fontWeight: '900',
    color: '#333',
  },
  subtitle: {
    fontSize: fs(14),
    color: '#777',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: wp(6),
    paddingBottom: hp(12),
  },
  busCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  busIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  busDetails: {
    flex: 1,
  },
  busName: {
    fontSize: fs(16),
    fontWeight: '700',
    color: '#333',
  },
  busNumber: {
    fontSize: fs(13),
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: fs(11),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  emptyText: {
    marginTop: 12,
    fontSize: fs(15),
    color: '#AAA',
    fontWeight: '500',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: wp(8),
    paddingBottom: hp(4),
    paddingTop: hp(2),
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: fs(18),
    fontWeight: 'bold',
  },
});

export default ClassifyBusScreen;
