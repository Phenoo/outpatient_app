import React from 'react';
import { Text } from 'react-native';

import { cn } from '@/lib/utils';

const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, onPress, ...props }, ref) => (
  <Text
    ref={ref}
    style={{ fontFamily: 'medium' }}
    className={cn('text-sm text-primarym  leading-none capitalize', className)}
    {...props}
  />
));

Label.displayName = 'Label';

export { Label };
