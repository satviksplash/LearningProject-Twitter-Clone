import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExploreIcon from '@mui/icons-material/Explore';

export const navigation = [
    { title: "Home", icon: <HomeIcon />, path: "/home" },
    { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
    { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
    { title: "Messages", icon: <MessageIcon />, path: "/messages" },
    { title: "Lists", icon: <ListAltIcon />, path: "/lists" },
    { title: "Profile", icon: <PersonOutlineIcon />, path: "/profile" },
    { title: "More", icon: <MoreHorizIcon />, path: "/more" },
  ];
