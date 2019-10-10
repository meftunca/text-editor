import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Icon, Typography, Button, colors, Menu, MenuItem } from "@material-ui/core";
import { Typography as textControl, fontSize } from "./TypographyControl";
import { ChangeEditor, ChangeStyle, objectToRGB } from "./../Components/Utils";
import { ChromePicker } from "react-color";
import { useSetState } from "react-use";

const useStyles: Function = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999
  },
  paper: {
    backgroundColor: "#f5f5f5",
    borderRadius: 0,
    borderTop: "1px solid #dadce0",
    borderBottom: "1px solid #dadce0"
  },
  popover: {
    position: "absolute",
    zIndex: 2
  },
  cover: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbarButton: {
    minWidth: 26,
    fontSize: 18,
    "&.active": {
      color: colors.blue[500],
      backgroundColor: "rgba(0,0,0,.07)"
    }
  },
  icon: {
    fontSize: 20
  },
  toolbarButtonGroup: {
    marginLeft: theme.spacing(2),
    display: "flex",
    alignContent: "center",
    alignItems: "center"
  },
  grow: {
    flexGrow: 1
  }
}));

const HeaderToolbar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.paper} elevation={0}>
        <Toolbar variant='dense'>
          <IconButton edge='start' className={classes.menuButton} color='primary' aria-label='menu'>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant='h6' color='primary'>
            TRDOC
          </Typography>
          <div className={classes.toolbarButtonGroup}>
            {textControl.map((i, k) => {
              let attr = i.role !== "seperator" ? { ["data-" + i.name]: i.value } : {};

              return (
                <Fragment key={k}>
                  {i.role === "seperator" ? (
                    <span className='toolbar-button-seperator'></span>
                  ) : (
                    <Button
                      size='small'
                      className={classes.toolbarButton}
                      {...attr}
                      onClick={() => {
                        ChangeEditor(i.name, i.value);
                      }}>
                      <Icon className={classes.icon}>{i.icon}</Icon>
                    </Button>
                  )}
                </Fragment>
              );
            })}
          </div>
          <span className='toolbar-button-seperator' />
          <ColorPicker />
          <span className='toolbar-button-seperator' />
          <FontSizeMenu />
          <div className={classes.grow} />
          <IconButton edge='start' className={classes.menuButton} color='primary' aria-label='menu'>
            <Icon>print</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const FontSizeMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [defaultValue, setDefaultValue] = React.useState(fontSize[0]);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = option => () => {
    setDefaultValue(option);
    ChangeEditor("font-size", option);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick}>
        {defaultValue}
      </Button>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose(defaultValue)}
        PaperProps={{ style: { marginTop: 34 } }}>
        {fontSize.map(option => (
          <MenuItem key={option} selected={option === defaultValue} onClick={handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
const ColorPicker = () => {
  const [state, setState] = useSetState({ active: false, lastColor: "black" });
  const classes = useStyles();

  const handleClick = () => {
    setState({ active: !state.active });
  };

  const handleClose = () => {
    setState({ active: false });
  };

  return (
    <div>
      <Button onClick={handleClick} className={classes.toolbarButton}>
        <Icon className={classes.icon} style={{ color: state.lastColor }}>
          brush
        </Icon>
      </Button>
      {state.active ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <ChromePicker
            onChange={e => {
              ChangeStyle("color", objectToRGB(e.rgb));
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
export default HeaderToolbar;
