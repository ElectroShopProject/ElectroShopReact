import {ActivityIndicator, Stack} from '@react-native-material/core';
import * as React from 'react';

export const LoaderOverlay: (isLoading, ...rest) => Node = () => (
  <Stack fill center spacing={4} backgroundColor={'transparent'}>
    <ActivityIndicator size="large" color="black" />
    ...rest
  </Stack>
);
