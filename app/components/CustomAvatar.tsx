import { getNameInitials } from '@/utils/getInitials';
import { Avatar as AntdAvatar } from 'antd';

type Props = {
  name: string;
  customStyle?: string;
};

const CustomAvatar = ({ name, customStyle, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size={'default'}
      className={`!bg-[#ac6803] !flex items-center justify-center border-none ${customStyle}`}
      {...rest}
      
    >
      {getNameInitials(name)}
    </AntdAvatar>
  );
};

export default CustomAvatar;
