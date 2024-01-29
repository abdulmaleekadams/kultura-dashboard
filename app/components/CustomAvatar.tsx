import { getNameInitials } from '@/utils/getInitials';
import { Avatar as AntdAvatar } from 'antd';

type Props = {
  name: string;
  customStyle?: string;
  shape?: 'circle' | 'square';
  size?: 'default' | 'large' | 'small';
  src?: string;
};

const CustomAvatar = ({
  name,
  customStyle,
  shape,
  size ='default',
  src,
  ...rest
}: Props) => {
  return (
    <AntdAvatar
      alt={name}
      shape={shape}
      src={src}
      size={size}
      className={`!bg-[#ac6803] !flex items-center justify-center border-none ${customStyle}`}
      {...rest}
    >
      {getNameInitials(name)}
    </AntdAvatar>
  );
};

export default CustomAvatar;
