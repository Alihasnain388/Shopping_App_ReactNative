import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ThirdScreen = ({ route }) => {
  const { selectedItems = [] } = route.params || {};
  console.log('Received selectedItems:', selectedItems);

  const [items, setItems] = useState(
    selectedItems.map((item) => ({ ...item, quantity: 1 }))
  );

  const [promoCode, setPromoCode] = useState('');
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  };

  const deleteList = () => {
    setItems([]);
    setPromoCode('');
    setIsPromoCodeValid(false);
    setPromoMessage('');
    setAdditionalInfo('');
    setPaymentMethod(null);
    setPhoneNumber('');
    setPhoneError('');
  };

  const increaseQuantity = (itemId) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setItems(
      items.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotalCost = () => {
    let total = items.reduce((total, item) => {
      const itemPrice = parseFloat(item.Price.replace('£', '').trim());
      return total + itemPrice * item.quantity;
    }, 0);

    if (isPromoCodeValid) {
      total = total * 0.8;
    }

     return `£${total.toFixed(2)}`;
  };

  const applyPromoCode = () => {
    if (promoCode === '100200') {
      setIsPromoCodeValid(true);
      setPromoMessage('Success');
    } else {
      setIsPromoCodeValid(false);
      setPromoMessage('Invalid promo code.');
    }
  };

  const confirmShoppingList = () => {
    if (!paymentMethod) {
      alert('Please select a payment method before confirming.');
      return;
    }

    if (!phoneNumber || !/^\d{11}$/.test(phoneNumber)) {
      alert('Please enter a valid phone number(11 digits).');
      return;
    }

    setItems([]);
    setPromoCode('');
    setIsPromoCodeValid(false);
    setPromoMessage('');
    setAdditionalInfo('');
    setPaymentMethod(null);
    setPhoneNumber('');

    alert(`Order Confirmed. We will contact at your phone number: ${phoneNumber} shortly.`);

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Description</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Quantity</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.Name}</Text>
            <Text>{item.Description}</Text>
            <Text>{item.Price}</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                <Icon name="minus-circle" size={22} color="red" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                <Icon name="plus-circle" size={22} color="green" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noItemsText}>No items remaining</Text>
        }
      />

      <View style={styles.phoneInputContainer}>
        <Text style={styles.phoneLabel}>Phone Number:</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter your phone number"
          placeholderTextColor="black"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            setPhoneError('');
          }}
          keyboardType="phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      </View>

      <View style={styles.promoCodeContainer}>
        <Text style={styles.phoneLabel}>Enter Promo Code:</Text>
        <View style={styles.promoCodeInputContainer}>
          <TextInput
            style={styles.promoCodeInput}
            placeholder="Enter Promo Code"
            placeholderTextColor="black"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity
            style={styles.PromoButton}
            onPress={applyPromoCode}
          >
            <Text style={styles.PromoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        {promoMessage ? (
          <Text
            style={isPromoCodeValid ? styles.successMessage : styles.errorMessage}
          >
            {promoMessage}
          </Text>
        ) : null}
      </View>

      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethodLabel}>Select Payment Method:</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Card' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('Card')}
          >
            <Text
              style={[
                styles.paymentOptionText,
                paymentMethod === 'Card' && styles.selectedPaymentOptionText,
              ]}
            >
              By Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'Cash' && styles.selectedPaymentOption,
            ]}
            onPress={() => setPaymentMethod('Cash')}
          >
            <Text
              style={[
                styles.paymentOptionText,
                paymentMethod === 'Cash' && styles.selectedPaymentOptionText,
              ]}
            >
              By Cash
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.additionalInfoContainer}>
        <Text style={styles.phoneLabel}>Additional Info:</Text>
        <TextInput
          style={styles.additionalInfoInput}
          placeholder="Any additional information (e.g. check item expiry date)"
          placeholderTextColor="black"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteListButton} onPress={deleteList}>
          <Text style={styles.deleteListButtonText}>Delete List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={confirmShoppingList}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>

        <Text style={styles.totalCostText}>Total: {calculateTotalCost()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(210,180,157)',
    padding:10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noItemsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
    marginVertical: 10,
  },
  promoCodeContainer: {
    marginVertical: 20,
  },
  promoCodeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
  },
  promoCodeInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: 35,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  },
  PromoButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  PromoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    marginTop: 5,
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  additionalInfoContainer: {
    marginVertical: 20,
  },
  additionalInfoInput: {
    height: 100,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  },
  deleteListButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  deleteListButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  paymentMethodContainer: {
    marginVertical: 20,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentOption: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  selectedPaymentOption: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedPaymentOptionText: {
    color: 'white',
  },
  phoneInputContainer: {
    marginVertical: 20,
  },
  phoneLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default ThirdScreen; 