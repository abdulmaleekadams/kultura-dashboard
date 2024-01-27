import { getNameInitials } from '@/utils/getInitials';
import { Avatar as AntdAvatar } from 'antd';

type Props = {
  name: string;
  customStyle?: string;
  shape?: 'circle' | 'square';
  size?: number;
  src?: string;
};

const CustomAvatar = ({
  name,
  customStyle,
  shape,
  size,
  src,
  ...rest
}: Props) => {

  
  return (
    <AntdAvatar
      alt={name}
      shape={shape}
      src={src}
      size={'default'}
      className={`!bg-[#ac6803] !flex items-center justify-center border-none ${customStyle}`}
      {...rest}
    >
      {getNameInitials(name)}
    </AntdAvatar>
  );
};

export default CustomAvatar;
