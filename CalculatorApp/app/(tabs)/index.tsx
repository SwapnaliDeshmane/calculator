import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ButtonProps {
  text: string;
  type?: 'number' | 'operation' | 'function';
}

export default function Page() {
  const [currentNumber, setCurrentNumber] = useState<string>('0');
  const [lastNumber, setLastNumber] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumber = (num: string): void => {
    if (currentNumber === '0') {
      setCurrentNumber(num);
    } else {
      setCurrentNumber(currentNumber + num);
    }
  };

  const handleOperation = (op: string): void => {
    setOperation(op);
    setLastNumber(currentNumber);
    setCurrentNumber('0');
  };

  const clear = (): void => {
    setCurrentNumber('0');
    setLastNumber(null);
    setOperation(null);
  };

  const calculate = (): void => {
    if (!operation || !lastNumber) return;

    const current = parseFloat(currentNumber);
    const last = parseFloat(lastNumber);
    let result: number | string;

    switch (operation) {
      case '+':
        result = last + current;
        break;
      case '-':
        result = last - current;
        break;
      case '×':
        result = last * current;
        break;
      case '÷':
        result = current !== 0 ? last / current : 'Error';
        break;
      default:
        return;
    }

    setCurrentNumber(result.toString());
    setLastNumber(null);
    setOperation(null);
  };

  const handleDecimal = (): void => {
    if (!currentNumber.includes('.')) {
      setCurrentNumber(currentNumber + '.');
    }
  };

  const handlePlusMinus = (): void => {
    setCurrentNumber((parseFloat(currentNumber) * -1).toString());
  };

  const handlePercent = (): void => {
    setCurrentNumber((parseFloat(currentNumber) / 100).toString());
  };

  const Button: React.FC<ButtonProps> = ({ text, type }) => (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'operation' && styles.operationButton,
        type === 'function' && styles.functionButton,
        text === '0' && styles.zeroButton,
      ]}
      onPress={() => {
        switch (type) {
          case 'number':
            handleNumber(text);
            break;
          case 'operation':
            text === '=' ? calculate() : handleOperation(text);
            break;
          case 'function':
            switch (text) {
              case 'C':
                clear();
                break;
              case '±':
                handlePlusMinus();
                break;
              case '%':
                handlePercent();
                break;
              case '.':
                handleDecimal();
                break;
            }
            break;
        }
      }}
    >
      <Text style={[
        styles.buttonText,
        type === 'function' && styles.functionText,
        type === 'operation' && styles.operationText,
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        {lastNumber && (
          <Text style={styles.lastNumber}>
            {lastNumber} {operation}
          </Text>
        )}
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {currentNumber}
        </Text>
      </View>
      
      <View style={styles.buttons}>
        <View style={styles.row}>
          <Button text="C" type="function" />
          <Button text="±" type="function" />
          <Button text="%" type="function" />
          <Button text="÷" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="7" type="number" />
          <Button text="8" type="number" />
          <Button text="9" type="number" />
          <Button text="×" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="4" type="number" />
          <Button text="5" type="number" />
          <Button text="6" type="number" />
          <Button text="-" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="1" type="number" />
          <Button text="2" type="number" />
          <Button text="3" type="number" />
          <Button text="+" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="0" type="number" />
          <Button text="." type="function" />
          <Button text="=" type="operation" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '200',
  },
  lastNumber: {
    color: '#757575',
    fontSize: 30,
  },
  buttons: {
    flex: 2,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zeroButton: {
    width: 170,
    alignItems: 'flex-start',
    paddingLeft: 35,
  },
  operationButton: {
    backgroundColor: '#FF9500',
  },
  functionButton: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 34,
  },
  operationText: {
    color: '#fff',
  },
  functionText: {
    color: '#000',
  },
});