import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { useDrugsById } from '@/services/queries';
import RenderHtml from 'react-native-render-html';

const IdTitle = ({ id }: { id: string }) => {
  const { width } = useWindowDimensions();

  const { data } = useDrugsById(id);
  const source = {
    html: ` ${data?.clinicalDescription}`,
  };
  if (!data) return <ActivityIndicator />;

  // console.log(data, 'hdhd');
  return (
    <View>
      <Text>
        {' - '}
        {data?.tradeName}/ {data?.strength}
      </Text>
      {/* <RenderHtml
        baseStyle={{
          backgroundColor: 'white',
        }}
        contentWidth={width}
        source={source}
      /> */}
      <Text className="capitalize mt-2 text-primary" style={{ fontFamily: 'medium' }}>
        ({data?.form})
      </Text>
    </View>
  );
};

export default IdTitle;

const styles = StyleSheet.create({});
