import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import Context from "../../context";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gap: "50px 0px",
    zIndex: 1,
  },

  userInfo: {
    zIndex: 1,
    display: "flex",
    padding: "10px",
    gap: "15px",
  },
  userAvatar: {
    zIndex: 1,
    "& .css-1tluy43-MuiAvatar-root": {
      color: "#ffffff",
      backgroundColor: "#333533",
    }
  },
  userName: {
    width: "100%",
    color: "#ffffff",
    fontFamily: "Montserrat, sans-se",
    fonySize: "16px",
    zIndex: 1,
  },
  welcomeMessage: {
    display: "flex",
    justifyContent: "center",
    padding:" 0px 10px 25px 10px",
  },
  welcomeMessageText: {
    fontFamily: "Montserrat, sans-se",
    fontSize: "20px",
    color:"#ffffff"
 }
});
function ContactInfo({ currentChat }) {
  const classes = useStyles();
  const user = useSelector((state) => state.user_login.details);
  const { isActive } = useContext(Context);

  const userName = () => {
    let userNameStr = currentChat;
    let arr = userNameStr.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let userNameStr2 = arr.join(" ");
    return userNameStr2;
  };

  return (
    <div className={classes.root}>
      {isActive != null ? <div className={classes.userInfo}>
        <div className={classes.userAvatar}>
          {" "}
          <Avatar sx={{ bgcolor: "#bdbdbd" }}>
            {currentChat.charAt(0).toUpperCase()}
          </Avatar>
        </div>
        {user.user.displayName ? (
          <div className={classes.userName}>{userName()}</div>
        ) : (
          <div>N/A</div>
        )}
      </div> :
        <div className={classes.welcomeMessage}>
          <span className={classes.welcomeMessageText}>Welcome to Book Club!
          </span>
        </div>}

    </div>
  );
}

export default ContactInfo;
