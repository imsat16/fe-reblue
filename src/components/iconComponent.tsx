import { BsSend } from "react-icons/bs";
import { MdNotifications, MdOutlineGroups } from "react-icons/md";
import { BiCategoryAlt, BiColor } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
export const getIconComponent = (iconName:any) => {
    switch (iconName) {
      case 'BsSend':
        return <BsSend />;
      case 'BiCategoryAlt':
        return <BiCategoryAlt />;
      case 'BiColor':
        return <BiColor />;
      case 'AiOutlineHistory':
        return <AiOutlineHistory />;
      case 'MdNotifications':
        return <MdNotifications />;
      case 'MdOutlineGroups':
        return <MdOutlineGroups />;
      default:
        return null;
    }
  };