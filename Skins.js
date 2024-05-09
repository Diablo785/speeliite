import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from './SideBar';

const CustomPopup = ({ isVisible, skin, price, onClose, onBuy, backgroundColor }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={[styles.popup, { backgroundColor: `${backgroundColor}` }]}>
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
  const [userCredits, setUserCredits] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const userId = JSON.parse(userData).id;
          const response = await fetch(`http://192.168.114.184/speeliite/get_user_credits.php`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setUserCredits(data.credits);
        } else {
          throw new Error('User data not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };
  
    fetchUserId();
  }, []);
  
  const skinPrices = {
    Cat: 100,
    Dog: 100,
    Apple: 100,
    Globe: 200,
    Toad: 200,
    Pickle: 200,
    Rat: 500,
    Pig: 500,
    Bacha: 500,
    Junko: 1000,
    Tike: 1000,
    Xinjo: 1000,
  };

  const handleSkinPress = async (skin, color, price) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        throw new Error('User data not found in AsyncStorage');
      }
      const { id } = JSON.parse(userData);

      const response = await fetch('http://192.168.114.184/speeliite/check_skin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          skinName: skin,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.owned) {
        alert('You already own this skin!');
      } else if (userCredits < price) {
        alert('Insufficient funds');
      } else {
        setSelectedSkin({ skin, price });
        setIsPopupVisible(true);
        setPopupColor(color);
      }
    } catch (error) {
      console.error('Error checking skin ownership:', error);
    }
  };

  const handleBuySkin = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        throw new Error('User data not found in AsyncStorage');
      }
      const { id, credits } = JSON.parse(userData);
  
      if (credits < selectedSkin.price) {
        throw new Error('Insufficient credits');
      }
  
      const response = await fetch('http://192.168.114.184/speeliite/buy_skin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          skinName: selectedSkin.skin,
          price: selectedSkin.price,
          deductedCredits: selectedSkin.price,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setIsPopupVisible(false);
        await AsyncStorage.setItem('userData', JSON.stringify({ id, credits: result.credits }));
        setUserCredits(result.credits);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const rows = [
    { color: '#0C9600', texts: ['Cat', 'Dog', 'Apple'], images: [require('./images/cat.png'), require('./images/dog.png'), require('./images/apple.png')] },
    { color: '#2059EC', texts: ['Globe', 'Toad', 'Pickle'], images: [require('./images/globe.png'), require('./images/toad.png'), require('./images/pickle.png')] },
    { color: '#960075', texts: ['Rat', 'Pig', 'Bacha'], images: [require('./images/rat.png'), require('./images/pig.png'), require('./images/bacha.png')] },
    { color: '#ECCB20', texts: ['Junko', 'Tike', 'Xinjo'], images: [require('./images/junko.png'), require('./images/tike.png'), require('./images/xinjo.png')] },
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
        <Text style={styles.blueBoxText}>$ {userCredits}</Text>
      </View>
      <View style={styles.contentContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.texts && (
              row.texts.map((text, index) => (
                <TouchableOpacity
                  key={`${rowIndex}-text-${index}`}
                  style={styles.boxWithText}
                  onPress={() => handleSkinPress(text, row.color, skinPrices[text])}
                >
                  <View style={[styles.box, styles.boxWithMargin, { borderColor: row.color }]}>
                    {row.images && (
                      <Image source={row.images[index]} style={{ width: 60, height: 60 }} />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
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
    left: 30,
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
