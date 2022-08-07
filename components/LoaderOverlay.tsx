import {ActivityIndicator, Stack} from '@react-native-material/core';
import * as React from 'react';

// TODO To remove
export const LoaderOverlay = (isLoading, ...rest) => (
  <Stack fill center style={{backgroundColor: 'transparent'}} spacing={4} >
    <ActivityIndicator size="large" color="black" />
    ...rest
  </Stack>
);
