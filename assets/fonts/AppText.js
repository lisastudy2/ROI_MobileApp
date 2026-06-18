import React from 'react';
import { Text } from 'react-native';
import { fonts } from './Fonts.js';

export default function AppText ({ style, ...props }) {
  return (
    <Text style={[ { fontFamily: fonts.regular }, style, ]} {...props} />
  ); 
} 