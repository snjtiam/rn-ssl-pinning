import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('No data');

  const getData = async () => {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
        { timeout: 10000 },
      );

      setData(JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>{data}</Text>
      <Button title="CALL API" onPress={getData} />
    </View>
  );
};

export default App;
