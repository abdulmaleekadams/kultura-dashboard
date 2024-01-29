import React from 'react';
import CustomAvatar from '../CustomAvatar';
import { Text } from '../Text';

type Props = {
  name: string;
  avatarUrl?: string;
  shape?: 'circle' | 'square';
};

const SelectOptionWithAvatar = ({ name, shape = 'circle', avatarUrl }: Props) => {
  return (
    <div className='flex items-center gap-2'>
      <CustomAvatar shape={shape} name={name} src={avatarUrl} size={'small'} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
