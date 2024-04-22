import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './sidebar';

const CustomPopup = ({ isVisible, skin, price, onClose, onBuy, backgroundColor }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={[styles.popup, { backgroundColor: `${backgroundColor}`, borderRadius: 20,}]}>
          <Text style={styles.popupText}>Do you want to buy {skin} skin for {price}?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.popupButton, styles.yesButton]} onPress={onBuy}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.popupButton, styles.noButton]} onPress={onClose}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const SkinsPage = () => {
  const navigation = useNavigation();
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupColor, setPopupColor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSkinPress = (skin, price, color) => {
    setSelectedSkin({ skin, price });
    setIsPopupVisible(true);
    setPopupColor(color);
  };

  const handleBuySkin = () => {
    console.log('Skin bought!');
    setIsPopupVisible(false);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const rows = [
    { color: '#0C9600', texts: ['Cat', 'Dog', 'Apple'], prices: ['$5', '$10', '$15'] },
    { color: '#2059EC', texts: ['Globe', 'Toad', 'Pickle'], prices: ['$8', '$12', '$20'] },
    { color: '#960075', texts: ['Rat', 'Pig', 'Bacha'], prices: ['$6', '$11', '$18'] },
    { color: '#ECCB20', texts: ['Junko', 'Tike', 'Xinjo'], prices: ['$7', '$13', '$16'] },
  ];

  return (
    <View style={styles.container}>
      <CustomPopup
        isVisible={isPopupVisible}
        skin={selectedSkin ? selectedSkin.skin : ''}
        price={selectedSkin ? selectedSkin.price : ''}
        onClose={handleClosePopup}
        onBuy={handleBuySkin}
        backgroundColor={popupColor}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <View style={styles.blueBox}>
        <Text style={styles.blueBoxText}>$ 100</Text>
      </View>
      <View style={styles.contentContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.texts && (
              row.texts.map((text, index) => (
                <TouchableOpacity
                  key={`${rowIndex}-text-${index}`}
                  style={styles.boxWithText}
                  onPress={() => handleSkinPress(text, row.prices[index], row.color)}
                >
                  <View style={[styles.box, styles.boxWithMargin, { borderColor: row.color }]}>
                    {row.color === 'white' && (
                      <Text>
                        <FontAwesome name="question" size={64} color="white" />
                      </Text>
                    )}
                  </View>
                  <Text style={styles.boxText}>{text}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        ))}
        <View style={[styles.comingSoon, styles.boxWithText]}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
        <View style={[styles.row, styles.marginTop]}>
          {[...Array(3)].map((_, index) => (
            <View key={`white-box-${index}`} style={styles.boxWithText}>
              <View style={[styles.box, styles.boxWithMargin, { borderColor: 'white' }]}>
                <Text>
                  <FontAwesome name="question" size={64} color="white" />
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={styles.burgerIcon}>
        <Image source={require('./images/burger_menu.png')} style={styles.burgerMenuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.greenButton} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 80,
    height: 80,
    borderWidth: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxWithMargin: {
    marginRight: 10,
  },
  boxWithText: {
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#0C9600',
    height: 60,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    marginBottom: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  comingSoonText: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 32,
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  burgerIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  burgerMenuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  blueBox: {
    position: 'absolute',
    top: 25,
    right: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 40,
    borderRadius: 50,
  },
  blueBoxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  popupButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  yesButton: {
    backgroundColor: 'green',
  },
  noButton: {
    backgroundColor: 'red',
  },
});

export default SkinsPage;
